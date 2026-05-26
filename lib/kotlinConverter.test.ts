import { describe, it, expect } from 'vitest';
import { convertJsonToKotlin } from './kotlinConverter';

describe('kotlinConverter', () => {
  it('should convert basic JSON to Kotlin data class', () => {
    const json = JSON.stringify({
      id: 1,
      name: "Test"
    });
    const result = convertJsonToKotlin(json, "TestClass");
    expect(result).toContain('data class TestClass(');
    expect(result).toContain('@SerializedName("id") val id: Int? = null');
    expect(result).toContain('@SerializedName("name") val name: String? = null');
    expect(result).toContain('import com.google.gson.annotations.SerializedName');
  });

  it('should handle nullability and default values', () => {
    const json = JSON.stringify({
      nullableField: null
    });
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("nullableField") val nullableField: Any? = null');
  });

  it('should handle nested objects', () => {
    const json = JSON.stringify({
      user: {
        id: 1,
        profile: {
          bio: "hello"
        }
      }
    });
    const result = convertJsonToKotlin(json, "Response");
    expect(result).toContain('data class Response(');
    expect(result).toContain('@SerializedName("user") val user: User? = null');
    expect(result).toContain('data class User(');
    expect(result).toContain('@SerializedName("profile") val profile: Profile? = null');
    expect(result).toContain('data class Profile(');
  });

  it('should handle arrays and suffix with List', () => {
    const json = JSON.stringify({
      items: [1, 2, 3],
      tags: ["a", "b"]
    });
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("items") val itemsList: List<Int>? = null');
    expect(result).toContain('@SerializedName("tags") val tagsList: List<String>? = null');
  });

  it('should handle nested objects in arrays', () => {
    const json = JSON.stringify({
      users: [{ id: 1, name: "Alice" }]
    });
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("users") val usersList: List<User>? = null');
    expect(result).toContain('data class User(');
  });

  it('should handle decimals and preserve precision', () => {
    const json = '{"price": 20.00, "amount": 10.5}';
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("price") val price: Double? = null');
    expect(result).toContain('@SerializedName("amount") val amount: Double? = null');
  });

  it('should handle large integers as Long', () => {
    const json = JSON.stringify({
      bigId: 2147483648
    });
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("bigId") val bigId: Long? = null');
  });

  it('should ignore headerResp and headerReq', () => {
    const json = JSON.stringify({
      headerResp: { status: "OK" },
      content: { data: "value" }
    });
    const result = convertJsonToKotlin(json);
    // If 'content' is present at top level, it uses content as the root.
    expect(result).not.toContain('headerResp');
    expect(result).toContain('data class Response(');
    expect(result).toContain('@SerializedName("data") val data: String? = null');
  });

  it('should return error message for invalid JSON', () => {
    const result = convertJsonToKotlin("{ invalid }");
    expect(result).toContain('// Error parsing JSON:');
  });

  it('should handle empty arrays', () => {
    const json = JSON.stringify({ items: [] });
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("items") val itemsList: List<Any>? = null');
  });

  it('should handle top-level arrays', () => {
    const json = JSON.stringify([{ id: 1 }]);
    const result = convertJsonToKotlin(json);
    // The current implementation might not handle top-level arrays perfectly 
    // depending on targetJson logic, let's see how it behaves.
    expect(result).toContain('data class Response');
  });

  it('should handle boolean and other types', () => {
    const json = JSON.stringify({ active: true, raw: undefined });
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("active") val active: Boolean? = null');
  });

  it('should handle small integers as Int', () => {
    const json = JSON.stringify({ count: 100 });
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("count") val count: Int? = null');
  });

  it('should handle decimals and trigger Double? type', () => {
    // This triggers the 'number' case where Number.isInteger is false (Line 63)
    const json = '{"weight": 70.5}';
    const result = convertJsonToKotlin(json);
    expect(result).toContain('@SerializedName("weight") val weight: Double? = null');
  });

  it('should ignore headerReq', () => {
    const json = JSON.stringify({
      headerReq: { timestamp: 123 },
      content: { data: "value" }
    });
    const result = convertJsonToKotlin(json);
    expect(result).not.toContain('headerReq');
  });
});
