import { describe, expect, test } from "@javarome/testscript"
import { CLI } from "./CLI.js"

interface MyArgs {
  argString: string;
  argBool: boolean;
  argNum: number
}

describe("CLI", () => {

  test("args", () => {
    const cli = new CLI([
      "/bin/node", "program.js", "-argString", "Hello", "-argBool", "true", "-argNum", "12"
    ])
    const args = cli.getArgs<MyArgs>()
    expect(args.argString).toBe("Hello")
    expect(args.argBool).toBe("true")
    expect(args.argNum).toBe("12")
  })
})
