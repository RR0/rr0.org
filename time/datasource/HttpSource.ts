import { Browser, Builder, By, ITimeouts, WebDriver } from "selenium-webdriver"
import { JSDOM } from "jsdom"
import { FetchHttpFetcher } from "./FetchHttpFetcher"
import { ArchiveHttpFetcher } from "./ArchiveHttpFetcher"

export class MimeType {
  static readonly csv: string = "text/csv"
  static readonly json: string = "application/json"
  static readonly txt: string = "text/plain"
  static readonly xls: string = "application/vnd.ms-excel"
  static readonly pdf: string = "application/pdf"
}

export interface HttpSourceSeleniumOptions {
  browser: string
  timeout: ITimeouts
  selector: string
}

export interface HttpFetcher {
  fetch<T>(url: URL, init?: RequestInit, resOut?: Partial<Response>, error?: HttpSourceError): Promise<T>
}

export interface HttpSourceOptions {
  selenium?: HttpSourceSeleniumOptions
  fetchers: HttpFetcher[]
}

export class HttpSourceError extends Error {
  constructor(url: string, readonly status: number, readonly statusText?: string) {
    super(`Could not fetch ${url}: ${`${statusText}(${status})` || `HTTP error ${status}`}`)
  }
}

/**
 * A source for cases that can be fetched online.
 */
export class HttpSource {

  protected driver: WebDriver

  constructor(protected options: HttpSourceOptions = {fetchers: [new FetchHttpFetcher(), new ArchiveHttpFetcher()]}) {
  }

  async getDriver(): Promise<WebDriver> {
    if (!this.driver) {
      const seleniumOptions = this.options.selenium
      this.driver = await new Builder().forBrowser(Browser.CHROME).build()
      await this.driver.manage().setTimeouts(seleniumOptions.timeout)
    }
    return this.driver
  }

  async get(queryUrl: URL, init: RequestInit = {}, resOut: Partial<Response> = {}): Promise<HTMLElement> {
    let pageSource: string
    const seleniumOptions = this.options.selenium
    if (seleniumOptions) {
      const driver = await this.getDriver()
      await driver.get(queryUrl.href)
      const resultSelector = seleniumOptions.selector || "html"
      const selector = By.css(resultSelector)
      await driver.findElements(selector)
      pageSource = await driver.getPageSource()
    } else {
      pageSource = await this.fetch<string>(queryUrl, init, resOut)
    }
    return new JSDOM(pageSource).window.document.documentElement
  }

  async fetch<T>(url: URL, init: RequestInit = {}, resOut: Partial<Response> = {}): Promise<T> {
    let previousError: HttpSourceError | undefined
    for (const fetcher of this.options.fetchers) {
      try {
        return await fetcher.fetch(url, init, resOut, previousError)
      } catch (e) {
        console.warn(e.toString())
        previousError = e
      }
    }
    throw previousError
  }

  async submitForm<T>(url: URL, obj: object, headers = {}): Promise<T> {
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
