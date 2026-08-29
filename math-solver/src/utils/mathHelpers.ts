export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim()
  if (trimmed === '' || trimmed === '-' || trimmed === '.' || trimmed === '-.') return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

export function formatNumber(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "Can't define value"
  if (Number.isInteger(n)) return String(n)
  return n.toFixed(digits).replace(/\.?0+$/, '')
}
