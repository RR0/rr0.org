import path from "path"
import { FileWriteConfig, HtmlFileContents, SsgContext } from "ssg-api"
import {
  APIFactory,
  CaseFactory,
  CityService,
  CmsOrganizationFactory,
  DataOptions,
  DepartmentService,
  HtmlRR0Context,
  OrganizationService,
  RegionService,
  RR0Context,
  RR0ContextImpl,
  TimeContext,
  TimeService
} from "@rr0/cms"
import { FileContents } from "@javarome/fileutil"
import { AllDataService, EventDataFactory, PeopleFactory, RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { TimeTestUtil } from "@rr0/cms/dist/time/TimeTestUtil"
import { CountryService } from "@rr0/cms/dist/org/country/CountryService"

export class RR0TestUtil implements RR0Context {

  readonly config: FileWriteConfig = {
    getOutputPath: (context: SsgContext): string => {
      return path.join(this.outDir, context.file.name)
    }
  }

  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  readonly dataService: AllDataService
  readonly caseFactory: CaseFactory

  readonly peopleFactory: PeopleFactory
  readonly time: TimeTestUtil
  readonly orgService: OrganizationService<any, undefined>
  readonly cityService: CityService
  readonly orgFactory: CmsOrganizationFactory
  readonly departmentService: DepartmentService
  readonly countryService: CountryService
  readonly regionService: RegionService

  constructor(readonly rootDir = "test", readonly outDir = "out", orgFiles: string[] = []) {
    const eventFactory = new RR0EventFactory()
    const sightingFactory = new EventDataFactory(eventFactory, ["sighting"], ["index"])
    const orgFactory = this.orgFactory = new CmsOrganizationFactory(eventFactory)
    this.caseFactory = new CaseFactory(eventFactory)
    this.peopleFactory = new PeopleFactory(eventFactory)
    const apiFactory = new APIFactory(eventFactory)
    const bookFactory = new TypedDataFactory(eventFactory, "book")
    const articleFactory = new TypedDataFactory(eventFactory, "article")
    const dataService = this.dataService = new AllDataService(
      [orgFactory, this.caseFactory, this.peopleFactory, bookFactory, articleFactory, sightingFactory, apiFactory])
    dataService.getFromDir("", ["people", "case"]).then(data => {
      //   console.debug(data)
    })
    const orgConfig: DataOptions = {rootDir: this.filePath("org"), files: orgFiles}
    this.orgService = new OrganizationService(dataService, orgFactory, orgConfig, undefined, [])
    this.time = new TimeTestUtil(this)
    const countryService = this.countryService = new CountryService(dataService, orgFactory, orgConfig, undefined,
      countries)
    const regionService = this.regionService = new RegionService(dataService, orgFactory, orgConfig, countryService,
      regions)
    const departmentService = this.departmentService = new DepartmentService(dataService, orgFactory, orgConfig,
      regionService, departments)
    this.cityService = new CityService(dataService, orgFactory, orgConfig, departmentService, cities)
  }

  newContext(inputFileName: string, contents?: string, locale = "fr"): RR0Context {
    const context = new RR0ContextImpl(locale, new TimeContext(), this.config)
    if (contents !== undefined && contents != null) {
      const langInfo = FileContents.getLang(inputFileName)
      context.file = new FileContents(inputFileName, "utf8", contents, new Date(), langInfo)
    } else {
      context.file = FileContents.read(inputFileName)
    }
    context.file = context.file  // By default
    return context
  }

  filePath(inputFileName: string): string {
    return path.join(this.rootDir, inputFileName)
  }

  newHtmlContext(inputFileName: string, contents?: string, locale = "fr"): HtmlRR0Context {
    const context = this.newContext(this.filePath(inputFileName), contents, locale)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.file
    const lang = currentFile.lang
    const htmlFile = new HtmlFileContents(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, lang)
    context.file = htmlFile
    htmlFile.title = title
    const htmlContext = context as HtmlRR0Context
    const timeContext = this.time.getService().contextFromFileName(htmlContext, inputFileName)
    Object.assign(htmlContext.time, timeContext)
    return htmlContext
  }
}

class RR0TestUtil {

  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  readonly config: FileWriteConfig
  readonly timeService: TimeService

  constructor(readonly rootDir = "test", readonly outDir = "out") {
    this.config = {
      getOutputPath(context: SsgContext): string {
        return path.join(this.outDir, context.file.name)
      }
    }
  }

  newContext(inputFileName: string, contents?: string): RR0Context {
    const context = new RR0ContextImpl("fr", new TimeContext(), this.config)
    if (contents !== undefined && contents != null) {
      const langInfo = FileContents.getLang(inputFileName)
      context.file = new FileContents(inputFileName, "utf8", contents, new Date(), langInfo)
    } else {
      context.file = FileContents.read(inputFileName)
    }
    context.file = context.file  // By default
    return context
  }

  newHtmlContext(inputFileName: string, contents?: string): HtmlRR0Context {
    const context = this.newContext(inputFileName, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.file
    context.file = new HtmlFileContents(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, currentFile.lang)
    const htmlContext = context as HtmlRR0Context
    const timeContext = this.timeService.contextFromFileName(htmlContext, inputFileName)
    Object.assign(htmlContext.time, timeContext)
    return htmlContext
  }
}

export const rr0TestUtil = new RR0TestUtil()

export function testFilePath(filePath: string) {
  return path.join(rr0TestUtil.rootDir, filePath)
}
