import { beforeEach, describe, expect } from "@javarome/testscript"
import * as test from "node:test"
import { Guesser } from "./Guesser"

describe("Guesser", () => {
  let guesser: Guesser
  beforeEach(() => {
    new Guesser()
  })

  test("guess", async () => {
    const guess = await guesser.guess("light in the sky")
    expect(guess).toBe("")
  })
})
