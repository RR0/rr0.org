export class StringUtil {

  static capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  static withoutDots(str: string): string {
    return str.replace(".", "")
  }

  static removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  static textToCamel(camel: string): string {
    return StringUtil.removeAccents(camel.trim()
      .replace(/ /g, ""))
  }
}
