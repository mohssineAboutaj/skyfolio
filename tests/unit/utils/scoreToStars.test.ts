import { describe, it, expect } from "vitest"
import { scoreToStars } from "~/utils/scoreToStars"

describe("scoreToStars", () => {
  it("maps score ranges to 1–5 stars", () => {
    expect(scoreToStars(100)).toBe(5)
    expect(scoreToStars(90)).toBe(5)
    expect(scoreToStars(89)).toBe(4)
    expect(scoreToStars(75)).toBe(4)
    expect(scoreToStars(74)).toBe(3)
    expect(scoreToStars(60)).toBe(3)
    expect(scoreToStars(59)).toBe(2)
    expect(scoreToStars(45)).toBe(2)
    expect(scoreToStars(44)).toBe(1)
    expect(scoreToStars(0)).toBe(1)
  })
})
