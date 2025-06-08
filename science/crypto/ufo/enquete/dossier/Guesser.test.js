import { beforeEach, describe, test } from "node:test"
import assert from "node:assert"
import { Guesser } from "./Guesser.js"

describe("Guesser", () => {
  let guesser

  beforeEach(() => {
    guesser = new Guesser()
  })

  test("guess", async () => {
    const guess = await guesser.guess("light in the sky")
    assert.equal(guess, "")
  })
})
