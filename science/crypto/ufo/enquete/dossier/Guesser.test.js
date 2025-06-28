import { beforeEach, describe, test } from "node:test"
import assert from "node:assert"
import { Guesser } from "./Guesser.js"

describe("Guesser", () => {
  let guesser

  beforeEach(async () => {
    guesser = new Guesser()
    await guesser.init()
  })

  test("guess", async () => {
    const guess = await guesser.guess("light in the sky")
    assert.equal(guess, "")
  })
})
