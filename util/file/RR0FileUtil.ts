import {promise as glob} from "glob-promise"

export class RR0FileUtil {
  static async findDirectoriesContaining(fileName) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index
    }

    return (await glob("**/" + fileName))
      .map(path => path.substring(0, path.lastIndexOf("/")))
      .filter(onlyUnique)
  }
}
