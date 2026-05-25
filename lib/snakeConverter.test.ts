import { describe, it, expect } from 'vitest';
import { toScreamingSnake, convertToScreamingSnake } from './snakeConverter';

describe('snakeConverter', () => {
  describe('toScreamingSnake', () => {
    it('should convert camelCase to SCREAMING_SNAKE_CASE', () => {
      expect(toScreamingSnake('myVariableName')).toBe('MY_VARIABLE_NAME');
    });

    it('should convert PascalCase to SCREAMING_SNAKE_CASE', () => {
      expect(toScreamingSnake('MyVariableName')).toBe('MY_VARIABLE_NAME');
    });

    it('should handle dots, hyphens and spaces', () => {
      expect(toScreamingSnake('my.variable-name test')).toBe('MY_VARIABLE_NAME_TEST');
    });

    it('should handle consecutive caps', () => {
      expect(toScreamingSnake('myVariableABCName')).toBe('MY_VARIABLE_ABC_NAME');
    });

    it('should trim and collapse underscores', () => {
      expect(toScreamingSnake('  __my--variable..name__  ')).toBe('MY_VARIABLE_NAME');
    });
  });

  describe('convertToScreamingSnake', () => {
    it('should convert simple identifiers and wrap them', () => {
      const input = 'myVar anotherVar';
      const expected = 'MY_VAR("myVar"), \nANOTHER_VAR("anotherVar")';
      expect(convertToScreamingSnake(input)).toBe(expected);
    });

    it('should extract identifiers from Kotlin val/var', () => {
      const input = 'val myProperty: String\nvar anotherProperty = 123';
      const expected = 'MY_PROPERTY("myProperty"), \nANOTHER_PROPERTY("anotherProperty")';
      expect(convertToScreamingSnake(input)).toBe(expected);
    });

    it('should handle @ annotations and val/var', () => {
      const input = '@SerializedName("some_field") val someField: String';
      expect(convertToScreamingSnake(input)).toBe('SOME_FIELD("someField")');
    });

    it('should handle multiple lines', () => {
      const input = 'firstLine\nsecondLine';
      const expected = 'FIRST_LINE("firstLine"), \nSECOND_LINE("secondLine")';
      expect(convertToScreamingSnake(input)).toBe(expected);
    });

    it('should handle lines with @ but no val/var', () => {
      const input = '@SomeAnnotation\njustText';
      const result = convertToScreamingSnake(input);
      expect(result).toContain('SOME_ANNOTATION("SomeAnnotation")');
      expect(result).toContain('JUST_TEXT("justText")');
    });

    it('should handle empty lines or spaces', () => {
      const input = '   \n  var x  \n  ';
      const result = convertToScreamingSnake(input);
      expect(result).toBe('X("x")');
    });

    it('should handle lines that are just @', () => {
      const input = '@';
      const result = convertToScreamingSnake(input);
      expect(result).toBe('@("@")');
    });
  });
});
