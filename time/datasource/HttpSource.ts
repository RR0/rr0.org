import { Browser, Builder, By, ITimeouts, WebDriver } from "selenium-webdriver"
import { JSDOM } from "jsdom"

export class MimeType {
  static readonly csv: string = "text/csv"
  static readonly json: string = "application/json"
  static readonly txt: string = "text/plain"
  static readonly xls: string = "application/vnd.ms-excel"
}

export interface HttpSourceSeleniumOptions {
  browser: string
  timeout: ITimeouts
  selector: string
}

export interface HttpSourceOptions {
  selenium?: HttpSourceSeleniumOptions
  userAgents: string[]
}

export const defaultSeleniumOptions = {
  browser: Browser.CHROME,
  timeout: {
    implicit: 5000
  },
  selector: "html"
}

/**
 * A source for cases that can be fetched online.
 */
export class HttpSource {

  protected driver: WebDriver

  constructor(protected options: HttpSourceOptions = {
    userAgents: [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
    ],
  }) {
  }

  static findParam(str: string, separator: string, param: string): string {
    const params = str.split(separator).map(s => {
      let t = s.trim()
      const q = t.indexOf("?")
      if (q) {
        t = t.substring(q + 1)
      }
      return t
    })
    const key = param + "="
    const foundParam = params.find(p => p.startsWith(key))
    return foundParam.substring(key.length)
  }

  randomUA(): string {
    const userAgents = this.options.userAgents
    const randomNumber = Math.floor(Math.random() * userAgents.length)
    return userAgents[randomNumber]
  }

  async getDriver(): Promise<WebDriver> {
    if (!this.driver) {
      const seleniumOptions = this.options.selenium
      this.driver = await new Builder().forBrowser(Browser.CHROME).build()
      await this.driver.manage().setTimeouts(seleniumOptions.timeout)
    }
    return this.driver
  }

  async get(queryUrl: string, init: RequestInit = {}, resOut = {}): Promise<HTMLElement> {
    let pageSource: string
    const seleniumOptions = this.options.selenium
    if (seleniumOptions) {
      const driver = await this.getDriver()
      await driver.get(queryUrl)
      const resultSelector = seleniumOptions.selector || "html"
      const selector = By.css(resultSelector)
      await driver.findElements(selector)
      pageSource = await driver.getPageSource()
    } else {
      pageSource = await this.fetch<string>(queryUrl, init, resOut)
    }
    return new JSDOM(pageSource).window.document.documentElement
  }

  async fetch<T>(url: string, init: RequestInit = {}, resOut = {}): Promise<T> {
    init.headers = Object.assign({"User-Agent": this.randomUA()}, init.headers)
    console.debug("Fetching", url, "with", init)
    const response = await fetch(url, init)
    if (response.ok) {
      Object.assign(resOut, response)
      const accept = init.headers["accept"]
      if (accept) {
        const buffer = await response.arrayBuffer()
        const charset = HttpSource.findParam(accept, ";", "charset")
        const decoder = new TextDecoder(charset)
        return decoder.decode(buffer) as T
      } else {
        switch (response.headers.get("content-type")) {
          case MimeType.json:
            return await response.json()
          case MimeType.xls:
            return await response.arrayBuffer() as T
          default:
            return await response.text() as T
        }
      }
    } else {
      throw Error(response.statusText)
    }
  }

  async submitForm<T>(url: string, obj: object, headers = {}): Promise<T> {
    const formData = new FormData()
    Object.entries(obj).forEach(entry => formData.append(entry[0], encodeURIComponent(entry[1])))
    const init: RequestInit = {method: "POST", headers, body: formData}
    return await this.fetch(url, init)
  }

  async close() {
    if (this.driver) {
      await this.driver.quit()
      this.driver = undefined
    }
  }
}
