import { promise as glob } from "glob-promise"

export class RR0FileUtil {

  static findDirectoriesContaining(fileName: string): string[] {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }

    return (glob.sync("!(out)/**/" + fileName))
      .map(path => path.substring(0, path.lastIndexOf("/")))
      .filter(onlyUnique)
  }
}
