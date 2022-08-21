export class UrlUtil {

  static normalized(url: string): string {
    if (!url.endsWith("/")) {
      url += "/"
    }
    return url
  }

  static absolute(url: string): string {
    if (!url.startsWith("/")) {
      url = "/" + url
    }
    return this.normalized(url)
  }
}
