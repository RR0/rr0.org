export class CLI {

  static getArgs(): Record<string, string> {
    const argv = process.argv
    const args: Record<string, string> = {}
    for (let i = 2; i < argv.length; i++) {
      const arg = argv[i]
      const dash = arg.lastIndexOf("-")
      if (dash >= 0) {
        const value = argv[i + 1]
        const key = arg.substring(dash + 1)
        args[key] = value
        i++
      }
    }
    return args
  }
}
