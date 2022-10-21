import {HtAccessReplaceCommand} from "./HtAccessReplaceCommand"

export class HtAccessToNetlifyRedirectsReplaceCommand extends HtAccessReplaceCommand {

  constructor(protected host: string) {
    super()
  }

  protected handleRedirect(from: string, to: string): string {
    let path = to.substring(this.host.length)
    const trailingFrom = from.endsWith("/")
    if (trailingFrom || !from.endsWith(".html")) {
      from += (trailingFrom ? "" : "/") + "*"
      const trailingTo = path.endsWith("/")
      path += (trailingTo ? "" : "/") + ":splat"
    }
    return `${from} /${path}\n`
  }

  protected handleDirectoryIndex(args: string[], result: string): string {
    const files = args.splice(1)
    for (const file of files) {
      result += `/* ${file}\n`
    }
    //result += `/*/ /:splat/${args[1]}\n`
    return result
  }
}
