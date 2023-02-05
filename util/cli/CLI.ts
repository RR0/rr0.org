export class CLI {

  constructor(protected argv: string[] = process.argv, protected argPrefix = "-") {
  }

  /**
   * @return A record of args values for each arg -key.
   */
  getArgs<T = Record<string, string>>(): T {
    const argv = this.argv
    const args: T = {} as T
    for (let i = 2; i < argv.length; i++) {
      const arg = argv[i]
      const dash = arg.lastIndexOf(this.argPrefix)
      if (dash >= 0) {
        args[arg.substring(dash + 1)] = argv[i + 1]
        i++
      }
    }
    return args
  }
}
