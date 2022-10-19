export class StringUtil {

  static capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  static withoutDots(str: string): string {
    return str.replace(".", "")
  }

  static withoutAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
}
