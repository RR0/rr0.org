export class StringUtil {

  static capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
