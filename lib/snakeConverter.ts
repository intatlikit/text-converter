/**
 * Core logic to convert text to SCREAMING_SNAKE_CASE.
 */
export function toScreamingSnake(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2') // camelCase transition
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2') // consecutive caps
    .replace(/[.\-\s]+/g, '_')           // separators (dots, hyphens, spaces)
    .toUpperCase()
    .replace(/_+/g, '_')                  // collapse multiple underscores
    .replace(/^_+|_+$/g, '');             // trim
}

function extractIdentifier(line: string): string {
  const trimmed = line.trim();
  
  // 1. Kotlin property declaration (val/var)
  const propertyMatch = trimmed.match(/(?:val|var)\s+([a-z][a-zA-Z0-9]*)/i);
  if (propertyMatch) return propertyMatch[1];
  
  // 2. Line with @ (likely annotation or serialized name)
  if (trimmed.includes('@')) {
    const words = trimmed.match(/[a-z][a-zA-Z0-9]*/g);
    if (words && words.length > 0) return words[words.length - 1];
  }

  // 3. Otherwise, return the trimmed line
  return trimmed;
}

/**
 * Converts text to SCREAMING_SNAKE_CASE wrapped in a function call.
 * Format: UPPER_CASE("original_identifier")
 * Supports multiple inputs separated by newlines or spaces.
 */
export function convertToScreamingSnake(input: string): string {
  const lines = input.split('\n').filter(line => line.trim() !== '');
  const allIdentifiers: string[] = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    // If it's a code-like line (contains val, var, or @), extract ONE identifier from it.
    if (trimmed.match(/\b(val|var)\b/i) || trimmed.includes('@')) {
      allIdentifiers.push(extractIdentifier(trimmed));
    } else {
      // Otherwise, split by space to support multiple simple identifiers on one line.
      const words = trimmed.split(/\s+/).filter(w => w !== '');
      allIdentifiers.push(...words);
    }
  });

  const results = allIdentifiers.map(id => {
    const converted = toScreamingSnake(id);
    return `${converted}("${id}")`;
  });

  return results.join(', \n');
}
