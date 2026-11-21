import path from "path"
import { CMSTestUtil } from "@rr0/cms/test"

/**
 * The CMS test context on rr0.org's own tree (its time/ directories, etc.).
 */
export class RR0TestUtil extends CMSTestUtil {

  constructor(rootDir = ".", outDir = "out", orgFiles: string[] = []) {
    super(rootDir, outDir, orgFiles)
  }
}

export const rr0TestUtil = new RR0TestUtil()

export function testFilePath(filePath: string) {
  return path.join(rr0TestUtil.rootDir, filePath)
}
