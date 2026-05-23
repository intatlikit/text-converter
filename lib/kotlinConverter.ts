/**
 * Converts JSON string to Kotlin Data Classes.
 * Constraints:
 * - All fields nullable with default = null.
 * - Strict @SerializedName on every property.
 * - Import com.google.gson.annotations.SerializedName.
 * - Nested classes defined inside parent body.
 * - Arrays end with 'List'.
 * - Ignore 'headerResp' and 'headerReq'.
 */
export function convertJsonToKotlin(jsonStr: string, rootClassName: string = "Response"): string {
  let json: any;
  try {
    json = JSON.parse(jsonStr);
  } catch (e) {
    return `// Error parsing JSON: ${(e as Error).message}`;
  }

  // Content Scope: If top-level has 'content', use it as the source for the root class
  // This effectively ignores headerResp/headerReq at the top level.
  let targetJson = json;
  if (json && typeof json === 'object' && !Array.isArray(json)) {
    if ('content' in json && json.content && typeof json.content === 'object') {
      targetJson = json.content;
    }
  }

  function toPascalCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // camelCase to snake_case (e.g., ImageURL -> Image_URL)
      .split(/[.\-_ ]/)
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  function toCamelCase(str: string): string {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  function getKotlinType(key: string, value: any, parentClassName: string): { type: string, nestedClass?: string } {
    if (value === null) return { type: 'Any?' };
    
    const type = typeof value;
    if (type === 'string') return { type: 'String?' };
    if (type === 'number') {
      if (Number.isInteger(value)) {
        return { type: value > 2147483647 ? 'Long?' : 'Int?' };
      }
      return { type: 'Double?' };
    }
    if (type === 'boolean') return { type: 'Boolean?' };
    
    if (Array.isArray(value)) {
      if (value.length === 0) return { type: 'List<Any>?' };
      const firstItem = value[0];
      const itemType = getKotlinType(key, firstItem, parentClassName);
      
      // Class name for nested object in array should be singular
      let className = toPascalCase(key);
      if (className.endsWith('s')) className = className.slice(0, -1);
      
      if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
         return { 
           type: `List<${className}>?`,
           nestedClass: generateClass(className, firstItem)
         };
      }
      return { type: `List<${itemType.type.replace('?', '')}>?` };
    }
    
    if (type === 'object') {
      const className = toPascalCase(key);
      return { 
        type: `${className}?`, 
        nestedClass: generateClass(className, value) 
      };
    }

    return { type: 'Any?' };
  }

  function generateClass(className: string, obj: any): string {
    const fields: string[] = [];
    const nestedClasses: string[] = [];

    for (const key in obj) {
      if (key === 'headerResp' || key === 'headerReq') continue;

      let propertyName = toCamelCase(key);
      const val = obj[key];
      
      let { type, nestedClass } = getKotlinType(key, val, className);
      
      if (Array.isArray(val) && !propertyName.endsWith('List')) {
        propertyName += 'List';
      }

      let comment = '';
      if (type.includes('Any')) {
        comment = ' // TODO: Implement later';
      }

      fields.push(`    @SerializedName("${key}") val ${propertyName}: ${type} = null${comment}`);
      if (nestedClass) nestedClasses.push(nestedClass);
    }

    let classCode = `data class ${className}(\n${fields.join(',\n')}\n)`;
    if (nestedClasses.length > 0) {
      classCode = classCode.replace(/\n\)$/, '\n) {\n' + nestedClasses.map(c => c.split('\n').map(l => '    ' + l).join('\n')).join('\n\n') + '\n}');
    }

    return classCode;
  }

  const result = generateClass(rootClassName, targetJson);
  
  return `import com.google.gson.annotations.SerializedName\n\n${result}`;
}
