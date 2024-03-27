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

  static join(first: string, second: string): string {
    const firstEndsWithSlash = first.endsWith("/")
    const secondStartsWithSlash = second.startsWith("/")
    if (firstEndsWithSlash) {
      return secondStartsWithSlash ? first + second.substring(1) : first + second
    } else {
      const firstEndsWithExtension = first.length > 5 && first.lastIndexOf(".") >= first.length - 5
      return secondStartsWithSlash || firstEndsWithExtension ? first + second : first + "/" + second
    }
  }

  static objToQueryParams(obj: object): string {
    return Object.entries(obj).map(entry => encodeURIComponent(entry[0]) + "=" + encodeURIComponent(entry[1])).join("&")
  }
}
