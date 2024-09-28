export class CLI {
  /**
   * Set up a CLI args parser.
   *
   * @param argv The args array.
   * @param prefix The prefix to detect args ("-" by default)
   */
  constructor(protected argv: string[] = process.argv, protected prefix = "-") {
  }

  /**
   * @return {Record} A record of args values for each "-arg" key.
   */
  getArgs<T = Record<string, (string | string[])>>(): T {
    const argv = this.argv
    const args: T = {} as T
    for (let i = 2; i < argv.length; i++) {
      const arg = argv[i]
      const dash = arg.lastIndexOf(this.prefix)
      if (dash >= 0) {
        let value = argv[i + 1]
        if (value.indexOf(",") > 0) {
          value = value.split(",")
        }
        args[arg.substring(dash + 1)] = value
        i++
      }
    }
    return args
  }
}
