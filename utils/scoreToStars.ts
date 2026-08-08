/**
 * Map a 0–100 skill score to a 1–5 star rating.
 */
export function scoreToStars(score: number): number {
  if (score >= 85) return 5
  if (score >= 60) return 4
  if (score >= 45) return 3
  if (score >= 25) return 2
  return 1
}
