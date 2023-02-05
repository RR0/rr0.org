import {CLI} from "./CLI"

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
