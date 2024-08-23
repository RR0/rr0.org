import { globSync } from "glob"

export class RR0FileUtil {

  static findDirectoriesContaining(fileName: string, exclude = ""): string[] {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }

    return (globSync(`!(${exclude})/**/${fileName}`))
      .map(path => path.substring(0, path.lastIndexOf("/")))
      .filter(onlyUnique)
  }
}
