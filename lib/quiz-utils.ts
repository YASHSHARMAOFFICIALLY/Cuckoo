/** Minimum 10 XP rewards quiz participation even when score is 0. */
export function calculateQuizXP(score: number): number {
  return Math.min(500, Math.max(10, score * 10));
}
