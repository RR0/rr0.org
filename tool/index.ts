import {FileInfo, writeFile} from "./FileUtil"
import {Ssg, SsgConfig, SsgContext} from "./Ssg"
import {SsiIncludeReplaceCommand} from "./replace/ssi/SsiIncludeReplaceCommand"
import {SsiIfReplaceCommand} from "./replace/ssi/SsiIfReplaceCommand"
import {SsiLastModifiedReplaceCommand} from "./replace/ssi/SsiLastModifiedReplaceCommand"
import {HtAccessToNetlifyReplaceCommand} from "./replace/htaccess/HtAccessToNetlifyReplaceCommand"
import {ReplacerFactory} from "./replace/ReplacerFactory"
import {SsgReplacer} from "./replace/SsgReplacer"
import {SsiVarReplaceCommand} from "./replace/ssi/SsiVarCommand"

/**
 * Replace a SSI var=value but appropriate HTML.
 */
function ssiVarReplacer(substring: string, ...args: any[]): string {
  const [variable, value] = args
  let replacement: string
  switch (variable) {
    case "title":
      replacement = `<title>${value}</title>`
      break
    default:
      replacement = substring
  }
  return replacement
}

interface DateBuilder {
  withYear(year: number): DateBuilder

  withMonth(month: number): DateBuilder

  withDate(date: number): DateBuilder

  withHour(hour: number): DateBuilder

  withMinutes(minutes: number): DateBuilder

  withTimeZone(timeZone: number): DateBuilder

  build(): string
}

export class UrlDateBuilder implements DateBuilder {
  protected url: string = "/time/"

  constructor(protected context: SsgContext) {
  }

  withYear(year: number): this {
    this.url += year.toString().split("").join("/")
    return this
  }

  withMonth(month: number): DateBuilder {
    this.url += "/" + month
    return this
  }

  withDate(date: number): this {
    this.url += "/" + date
    return this
  }

  withHour(hour: number): DateBuilder {
    return this
  }

  withMinutes(minutes: number): DateBuilder {
    return this
  }

  withTimeZone(timeZone: number): DateBuilder {
    return this
  }

  build(): string {
    return this.url
  }
}

export class TextDateBuilder implements DateBuilder {

  readonly date: Date
  protected options: Intl.DateTimeFormatOptions = {}

  constructor(protected context: SsgContext) {
    this.date = context.date || new Date()
  }

  withYear(year: number): this {
    this.date.setFullYear(year)
    this.options.year = this.context.options?.year || "numeric"
    return this
  }

  withMonth(month: number): this {
    this.date.setMonth(month - 1)
    this.options.month = this.context.options?.month || "2-digit"
    return this
  }

  withDate(date: number): this {
    this.date.setDate(date)
    this.options.day = this.context.options?.day || "2-digit"
    return this
  }

  withHour(hour: number): this {
    this.date.setHours(hour)
    this.options.hour = this.context.options?.hour || "2-digit"
    return this
  }

  withMinutes(minutes: number): this {
    this.date.setMinutes(minutes)
    this.options.minute = this.context.options?.minute || "2-digit"
    return this
  }

  withTimeZone(timeZone: number): this {
    return this
  }

  build(): string {
    return this.date.toLocaleString(this.context.locales, this.options)
  }
}

class TimeReplacerFactory implements ReplacerFactory {
  create(context: SsgContext): SsgReplacer {
    return {
      replacer: /**
       * Replace time tags but urls.
       */
      (substring: string, ...args: any[]): string => {
        const timeStr = args[0]
        let urlBuilder = new UrlDateBuilder(context)
        let textBuilder = new TextDateBuilder(context)
        const builders = [urlBuilder, textBuilder]
        let replacement = substring
        let [dateStr, remaining] = timeStr.split(" ")
        if (dateStr) {
          const dateSplit = dateStr.split("-")
          const [yearStr, monthStr, dayOfMonthStr] = dateSplit
          const year = parseInt(yearStr, 10)
          if (year.toString() === yearStr) {
            builders.forEach(builder => builder.withYear(year))
          }
          const dayOfMonth = parseInt(dayOfMonthStr, 10)
          if (dayOfMonth) {
            builders.forEach(builder => builder.withDate(dayOfMonth))
          }
          const month = parseInt(monthStr, 10)
          if (month) {
            builders.forEach(builder => builder.withMonth(month))
          }
          const timeExec = /([\d:]+)([A-Z]{3})?/.exec(remaining)
          if (timeExec) {
            const time = timeExec[1]
            const [hour, minutes] = time.split(":")
            if (hour) {
              builders.forEach(builder => builder.withHour(parseInt(hour, 10)))
            }
            if (minutes) {
              builders.forEach(builder => builder.withMinutes(parseInt(minutes, 10)))
            }
            const timeZone = timeExec[2]
          }
          let url = urlBuilder.build()
          let text = textBuilder.build()
          context.date = textBuilder.date
          replacement = `<a href="${url}">${text}</a>`
        }
        return replacement
      }
    }
  }
}

const config: SsgConfig = {
  contents: [
    {
      roots: [".htaccess"],
      replacements: [new HtAccessToNetlifyReplaceCommand()],
      outputFile(inputFile: FileInfo): FileInfo {
        return Object.assign({...inputFile}, {name: "_redirects"})
      }
    },
    {
      roots: [
        "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html",
        "croyance/**/*.html",
        "droit/**/*.html",
        "org/**/*.html",
        "people/**/*.html",
        "place/**/*.html",
        "politique/**/*.html",
        "science/**/*.html",
        "tech/**/*.html",
        "time/**/*.html",
        "politique/**/*.html",
        "udb/**/*.*",
        "js/**/*.html"
      ],
      replacements: [
        new SsiIncludeReplaceCommand(),
        new SsiIfReplaceCommand(),
        new SsiVarReplaceCommand({replacer: ssiVarReplacer}),
        new SsiLastModifiedReplaceCommand()
        //   new HtmlTagReplaceCommand("time", new TimeReplacerFactory())
      ],
      outputFile(inputFile: FileInfo): FileInfo {
        return inputFile
      }
    }
  ],
  copies: [
    "favicon.ico",
    "rr0.css", "print.css",
    "rr0.js", "bower_components/VirtualSky/virtualsky.js", "bower_components/VirtualSky/virtualsky-planets.min.js",
    "**/*.png", "**/*.jpg", "**/*.gif", "!out/**/*"
  ],
  outDir: "out"
}

async function output(info: FileInfo): Promise<void> {
  info.name = `${config.outDir}/${info.name}`
  try {
    console.log("Writing", info.name)
    await writeFile(info)
  } catch (e) {
    console.error(info.name, e)
  }
}

new Ssg(config)
  .start(output)
  .then(result => console.log("Wrote", result.contentCount, "content files"))
