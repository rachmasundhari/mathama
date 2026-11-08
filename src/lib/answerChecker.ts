/**
 * Strict numeric parser for simple junior-high answers.
 * Handles integers, decimals (dot/comma), and simple fractions.
 * It deliberately does NOT evaluate arbitrary JavaScript or symbolic algebra.
 */
export function parseNumericAnswer(input: string): number | null {
  const raw = input.trim().replace(/\s+/g, '').replace(/−/g, '-');
  if (!raw) return null;

  if (raw.includes('/')) {
    const parts = raw.split('/');
    if (parts.length !== 2) return null;
    const numerator = parseSimpleNumber(parts[0]);
    const denominator = parseSimpleNumber(parts[1]);
    if (numerator === null || denominator === null || denominator === 0) return null;
    return numerator / denominator;
  }
  return parseSimpleNumber(raw);
}

function parseSimpleNumber(raw: string): number | null {
  // Comma as decimal separator. Dot grouping only when followed by exactly 3 digits.
  let normalized = raw;
  if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(raw)) {
    normalized = raw.replace(/\./g, '').replace(',', '.');
  } else if (/^-?\d+,\d+$/.test(raw)) {
    normalized = raw.replace(',', '.');
  }
  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function checkNumericAnswer(input: string, expected: number, tolerance = 1e-8): boolean {
  const value = parseNumericAnswer(input);
  return value !== null && Number.isFinite(expected) && Math.abs(value - expected) <= tolerance;
}
