import { TimeContext } from "./time/TimeContext"
import { CaseDirectoryStep } from "./science/crypto/ufo/enquete/dossier/CaseDirectoryStep"
import { PeopleDirectoryStep } from "./people/PeopleDirectoryStep"
import { promise as glob } from "glob-promise"
import { GooglePlaceService } from "./place/GooglePlaceService"
import { OrganizationService } from "./org/OrganizationService"
import { RR0SsgContextImpl } from "./RR0SsgContext"
import { CLI } from "./util/cli/CLI"
import {
  AngularExpressionReplaceCommand,
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  CopyStepConfig,
  FileContents,
  FileUtil,
  HtAccessToNetlifyConfigReplaceCommand,
  HtmlLinks,
  HtmlMeta,
  HtmlTagReplaceCommand,
  OutputFunc,
  Ssg,
  SsgConfig,
  SsgContext,
  SsiEchoVarReplaceCommand,
  SsiIfReplaceCommand,
  SsiIncludeReplaceCommand,
  SsiLastModifiedReplaceCommand,
  SsiSetVarReplaceCommand,
  StringEchoVarReplaceCommand
} from "ssg-api"
import { LanguageReplaceCommand } from "./lang/LanguageReplaceCommand"
import { SsiTitleReplaceCommand } from "./time/SsiTitleReplaceCommand"
import { PeopleReplacerFactory } from "./people/PeopleReplacerFactory"
import { SourceReplacerFactory } from "./source/SourceReplacerFactory"
import { timeDefaultHandler } from "./time/TimeDefaultTitle"
import { NoteReplacerFactory } from "./note/NoteReplacerFactory"
import { WitnessReplacerFactory } from "./people/witness/WitnessReplacerFactory"
import { AnchorReplaceCommand } from "./anchor/AnchorReplaceCommand"
import { TimeLinkDefaultHandler } from "./time/TimeLinkDefaultHandler"
import { AuthorReplaceCommand } from "./people/author/AuthorReplaceCommand"
import { rr0DefaultCopyright } from "./RR0DefaultCopyright"
import { PlaceReplacerFactory } from "./place/PlaceReplacerFactory"
import { TimeReplacerFactory } from "./time/TimeReplacerFactory"
import { MetaLinkReplaceCommand } from "./MetaLinkReplaceCommand"
import { OutlineReplaceCommand } from "./outline/OutlineReplaceCommand"
import { ImageCommand } from "./ImageCommand"
import { SearchCommand } from "./search/SearchCommand"
import { SearchIndexStep } from "./search/SearchIndexStep"
import { BaseReplaceCommand } from "./BaseReplaceCommand"
import { OpenGraphCommand } from "./OpenGraphCommand"
import { DescriptionReplaceCommand } from "./DescriptionReplaceCommand"
import { BookDirectoryStep } from "./book/BookDirectoryStep"
import path from "path"
import { IndexedReplacerFactory } from "./index/IndexedReplacerFactory"
import { CodeReplacerFactory } from "./tech/info/soft/proj/impl/lang/CodeReplacerFactory"
import { ChronologyReplacerFactory } from "./time/datasource/ChronologyReplacerFactory"
import { rr0Mapping } from "./time/datasource/rr0/RR0Mapping"
import { PeopleService } from "./people/PeopleService"
import { ContentVisitor, RR0ContentStep } from "./RR0ContentStep"
import { CaseAnchorHandler } from "./anchor/CaseAnchorHandler"
import { DataService, DefaultDataFactory } from "./DataService"
import { DataAnchorHandler } from "./anchor/DataAnchorHandler"
import { CaseSummaryRenderer } from "./time/CaseSummaryRenderer"
import { EventReplacer, EventReplacerFactory } from "./time/EventReplacerFactory"
import { HttpSource } from "./time/datasource/HttpSource"
import { SourceRenderer } from "./source/SourceRenderer"
import { TimeService } from "./time/TimeService"
import { CaseService } from "./science/crypto/ufo/enquete/dossier/CaseService"
import { TimeReplacer } from "./time/TimeReplacer"
import { UnitReplaceCommand } from "./value/UnitReplaceCommand"
import { BookContentVisitor } from "./book/BookContentVisitor"
import { ChronologyReplacerActions } from "./time/datasource/ChronologyReplacerActions"
import { SourceReplacer } from "./source/SourceReplacer"
import { NoteReplacer } from "./note/NoteReplacer"
import { NoteFileCounter } from "./note/NoteFileCounter"
import { SourceSiteCounter } from "./source/SourceSiteCounter"
import { PersisentSourceRegistry } from "./source/PersisentSourceRegistry"
import { SourceIndexStep } from "./source/SourceIndexStep"

interface RR0BuildArgs {
  /**
   * If the search index must be regenerated or not.
   */
  reindex?: "true" | "false"

  /**
   * Comma-separated list of file patterns to parse as contents.
   */
  contents?: string

  /**
   * Comma-separated list of file patterns to copy to out dir.
   */
  copies?: string

  /**
   * Comma-separated list of file patterns to books to generate TOCs for.
   */
  books?: string
}

console.time("ssg")
const args = new CLI().getArgs<RR0BuildArgs>()
const cliContents = args.contents
console.debug("contents", cliContents)
const mandatoryRoots = ["people/*.html", "science/crypto/ufo/enquete/dossier/*.html"]
const contentRoots = cliContents
  ? cliContents.split(",").concat(mandatoryRoots)
  : [
    "croyance/**/*.html",
    "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html", "FAQ.html", "Referencement.html",
    "time/**/*.html",
    "book/**/*.html",
    "droit/**/*.html",
    "org/**/*.html",
    "people/**/*.html",
    "place/**/*.html",
    "politique/**/*.html",
    "science/**/*.html",
    "tech/**/*.html",
    "udb/*.html",
    "js/**/*.html"
  ]
const copiesArg = args.copies
const copies = copiesArg ? copiesArg.split(",") : [
  "favicon.ico", "manifest.json", "opensearch.xml", "apple-touch-icon.png", "apple-touch-icon_400x400.png", "screenshot1.jpg",
  "rr0.css", "map.css", "diagram.css", "print.css", "figure.css", "section.css", "table.css",
  // "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  "**/*.cmmn", "**/*.bpmn",
  "tech/info/soft/reseau/protocole/index.js", "tech/info/soft/reseau/protocole/ports.json", "tech/info/soft/reseau/protocole/index.css",
  "tech/info/soft/data/doc/index.js", "tech/info/soft/data/doc/index.json", "tech/info/soft/data/doc/index.css",
  "people/index.js", "people/index.css", "people/witness/index.css",
  "search/SearchComponent.mjs", "search/index.json", "search/search.css",
  "index/index.js", "lang/form.js", "lang/form.css", "lang/speech.js", "lang/speech.css",
  "croyance/divin/theisme/mono/livre/islam/coran/index.js"
]

const outDir = "out"

const config: SsgConfig = {
  getOutputPath(context: SsgContext): string {
    return path.join(outDir, context.file.name)
  }
}

const outputFunc: OutputFunc
  = async (context: SsgContext, outFile: FileContents): Promise<void> => {
  try {
    context.log("Writing", outFile.name)
    await outFile.write()
    context.file.contents = outFile.contents
  } catch (e) {
    context.error(outFile.name, e)
  }
}

const timeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
}
const timeContext = new TimeContext(timeFormat)
const context = new RR0SsgContextImpl("fr", timeContext, config)
context.setVar("mail", "rr0@rr0.org")

const siteBaseUrl = "https://rr0.org/"
const htAccessToNetlifyConfig: ContentStepConfig = {
  replacements: [new HtAccessToNetlifyConfigReplaceCommand(siteBaseUrl)],
  roots: [".htaccess"],
  getOutputPath(_context: SsgContext): string {
    return path.join(outDir, "netlify.toml")
  }
}

const timeService = new TimeService()

timeService.getFiles().then(async (timeFiles) => {
  context.setVar("timeFilesCount", timeFiles.length)
  const peopleFiles = await glob("people/?/*")
  context.setVar("peopleFilesCount", peopleFiles.length)
  const sightingFactory = new DefaultDataFactory("sighting", ["index"])
  const orgFactory = new DefaultDataFactory("org", ["index"])
  const caseFactory = new DefaultDataFactory("case")
  const peopleFactory = new DefaultDataFactory("people")
  const bookFactory = new DefaultDataFactory("book")
  const factories = [orgFactory, caseFactory, peopleFactory, bookFactory, sightingFactory]

  const dataService = new DataService(factories)
  const timeReplacer = new TimeReplacer(timeService.renderer)
  const caseService = new CaseService(dataService, timeReplacer)
  const peopleService = new PeopleService(peopleFiles, dataService)
  const bookMeta = new Map<string, HtmlMeta>()
  const bookLinks = new Map<string, HtmlLinks>()
  const ufoCasesStep = await CaseDirectoryStep.create(outputFunc, config, caseService)
  const peopleSteps = await PeopleDirectoryStep.create(outputFunc, config, peopleService)
  // Publish case.json files so that vraiufo.com will find them
  copies.push(...(ufoCasesStep.config.rootDirs).map(dir => path.join(dir, "case.json")))
  await FileUtil.writeFile(path.join(outDir, "casesDirs.json"), JSON.stringify(ufoCasesStep.config.rootDirs), "utf-8")
  copies.push(...(peopleSteps.reduce((rootDirs, peopleStep) => {
    rootDirs.push(...peopleStep.config.rootDirs)
    return rootDirs
  }, [])).map(dir => path.join(dir, "people.json")))
  await FileUtil.writeFile(path.join(outDir, "peopleDirs.json"), JSON.stringify(peopleFiles), "utf-8")

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    throw Error("GOOGLE_MAPS_API_KEY is required")
  }
  context.setVar("mapsApiKey", apiKey)
  const placeService = new GooglePlaceService("place", apiKey)

  const orgService = new OrganizationService([], "org", undefined)

  const searchCommand = new SearchCommand({notIndexedUrls: ["404.html", "Referencement.html"], indexWords: false})
  const baseUrl = "https://rr0.org"
  const sourceRenderer = new SourceRenderer()
  const caseRenderer = new CaseSummaryRenderer(sourceRenderer)
  // const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
  const actions: ChronologyReplacerActions = {read: [], write: ["backup"]}
  const databaseAggregationCommand = new HtmlTagReplaceCommand("ul",
    new ChronologyReplacerFactory(timeService,
      [/*new GeipanRR0Mapping(actions),
        /*, baseOvniFranceRR0Mapping, fuforaRR0Mapping, nuforcRR0Mapping, urecatRR0Mapping*/
      ],
      rr0Mapping, actions, caseRenderer)
  )
  const pageReplaceCommands = [
    new SsiIncludeReplaceCommand(),
    new BaseReplaceCommand("/"),
    new LanguageReplaceCommand(),
    new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright]),
    new StringEchoVarReplaceCommand(),
    new AngularExpressionReplaceCommand(),
    new SsiIfReplaceCommand(),
    new SsiSetVarReplaceCommand("title", (_match: string, ...args: any[]) => `<title>${args[0]}</title>`),
    new SsiSetVarReplaceCommand("url",
      (_match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
    new SsiLastModifiedReplaceCommand(context.time.options),
    new SsiTitleReplaceCommand([timeDefaultHandler]),
    new DescriptionReplaceCommand("UFO data for french-reading people", "abstract"),
    new AuthorReplaceCommand(timeService)
  ]
  const http = new HttpSource()
  const sourceRegistryFileName = "source/index.json"
  const sourceFactory = new PersisentSourceRegistry(dataService, http, baseUrl, sourceRegistryFileName)
//  const sourceCounter = new SourceFileCounter()
  const sourceCounter = new SourceSiteCounter()
  const sourceReplacer = new SourceReplacer(sourceRenderer, sourceFactory, sourceCounter)
  const sourceReplacerFactory = new SourceReplacerFactory(sourceReplacer)
  const noteCounter = new NoteFileCounter()
  const noteReplacer = new NoteReplacer(noteCounter)
  const noteReplacerFactory = new NoteReplacerFactory(noteReplacer)
  const eventReplacer = new EventReplacer(caseRenderer, dataService)
  const contentsReplaceCommand = [
    databaseAggregationCommand,
    new ClassDomReplaceCommand(new EventReplacerFactory(eventReplacer), "event"),
    new ClassDomReplaceCommand(sourceReplacerFactory, "source"),
    new HtmlTagReplaceCommand("time", new TimeReplacerFactory(timeService.renderer)),
    new HtmlTagReplaceCommand("code", new CodeReplacerFactory()),
    new ClassDomReplaceCommand(new PeopleReplacerFactory(peopleService), "people"),
    new ClassDomReplaceCommand(new PlaceReplacerFactory(), "place"),
    new ClassDomReplaceCommand(new WitnessReplacerFactory(), "temoin", "temoin1", "temoin2", "temoin3"),
    new ClassDomReplaceCommand(noteReplacerFactory, "note"),
    new ClassDomReplaceCommand(new IndexedReplacerFactory(), "indexed"),
    new UnitReplaceCommand(),
    new MetaLinkReplaceCommand(new TimeLinkDefaultHandler(timeFiles))
  ]
  const ssg = new Ssg(config)
  const getOutputPath = (context: SsgContext): string => path.join(outDir, context.file.name)
  const structuralStep = new RR0ContentStep([
    htAccessToNetlifyConfig,
    {
      roots: contentRoots,
      replacements: [
        new SsiIncludeReplaceCommand()
      ],
      getOutputPath
    }
  ], outputFunc, [])
  ssg.add(structuralStep)
  ssg.add(ufoCasesStep)
  ssg.add(...peopleSteps)
  if (contentRoots) {
    const contentVisitors: ContentVisitor[] = []
    if (args.books) {
      contentVisitors.push(new BookContentVisitor(bookMeta, bookLinks))
    }
    const contentReplacements = [
      ...pageReplaceCommands,
      ...contentsReplaceCommand,
      new OutlineReplaceCommand(),
      new AnchorReplaceCommand(siteBaseUrl, [new CaseAnchorHandler(caseService), new DataAnchorHandler(dataService)]),
      new ImageCommand(outDir, 275, 500),
      new OpenGraphCommand(outDir, timeFiles, baseUrl),
      searchCommand
    ]
    ssg.add(new RR0ContentStep([
      htAccessToNetlifyConfig,
      {
        roots: contentRoots,
        replacements: contentReplacements,
        getOutputPath
      }
    ], outputFunc, contentVisitors))
  }
  if (args.books) {
    ssg.add(await BookDirectoryStep.create(outputFunc, config, bookMeta, bookLinks))
  }
  if (args.reindex === "true") {
    ssg.add(new SearchIndexStep("search/index.json", searchCommand))
    ssg.add(new SourceIndexStep(sourceRegistryFileName, sourceFactory))
  }
  if (copies) {
    const copyConfig: CopyStepConfig = {
      getOutputPath,
      destDir: outDir,
      sourcePatterns: copies,
      options: {ignore: ["node_modules/**", "out/**"]}
    }
    ssg.add(new CopyStep(copyConfig))
  }
  try {
    const result = await ssg.start(context)
    context.log("Completed", result)
  } catch (err) {
    try {
      context.error(err, context.file.name)
    } catch (e) {
      context.error(err)
    }
  } finally {
    console.timeEnd("ssg")
  }
})
