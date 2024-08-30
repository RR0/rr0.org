import { TimeContext } from "./time/TimeContext"
import { CaseDirectoryStep } from "./science/crypto/ufo/enquete/dossier/CaseDirectoryStep"
import { GooglePlaceService } from "./place/GooglePlaceService"
import { OrganizationService } from "./org/OrganizationService"
import { HtmlRR0SsgContext, RR0SsgContextImpl } from "./RR0SsgContext"
import { CLI } from "./util/cli/CLI"
import {
  AngularExpressionReplaceCommand,
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  CopyStepConfig,
  DomReplaceCommand,
  FileContents,
  FileUtil,
  HtAccessToNetlifyConfigReplaceCommand,
  HtmlLinks,
  HtmlMeta,
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
import { SearchVisitor } from "./search/SearchVisitor"
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
import { AllDataService } from "./data/AllDataService"
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
import { PersistentSourceRegistry } from "./source/PersistentSourceRegistry"
import { SourceIndexStep } from "./source/SourceIndexStep"
import { SourceFileCounter } from "./source/SourceFileCounter"
import { TimeElementFactory } from "./time/TimeElementFactory"
import { DefaultContentVisitor } from "./DefaultContentVisitor"
import { PeopleFactory } from "./people/PeopleFactory"
import { OrganizationFactory } from "./org/OrganizationFactory"
import { APIFactory } from "./tech/info/soft/APIFactory"
import { RR0EventFactory } from "./event/RR0EventFactory"
import { TypedDataFactory } from "./data/TypedDataFactory"
import { NoteRenderer } from "./note/NoteRenderer"
import { PeopleDirectoryStepFactory } from "./people/PeopleDirectoryStepFactory"
import { TimeTextBuilder } from "./time/TimeTextBuilder"
import { Time } from "./time/Time"
import { CaseFactory } from "./science/crypto/ufo/enquete/dossier/CaseFactory"

interface RR0BuildArgs {
  /**
   * If the search index must be regenerated or not.
   * For ex: "pages,sources"
   */
  reindex: string

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

  /**
   * Force re-generation even if file has not changed.
   */
  force?: string
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
  "rr0.css", "map.css", "diagram.css", "print.css", "figure.css", "section.css", "table.css", "nav.css",
  // "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  "**/*.cmmn", "**/*.bpmn",
  "tech/info/soft/reseau/protocole/index.js", "tech/info/soft/reseau/protocole/ports.json", "tech/info/soft/reseau/protocole/index.css",
  "tech/info/soft/data/doc/index.js", "tech/info/soft/data/doc/index.json", "tech/info/soft/data/doc/index.css",
  "people/index.js", "people/index.css", "people/witness/index.css",
  "search/SearchComponent.mjs", "search/index.json", "search/search.css",
  "source/index.css",
  "link.css", "quote.css",
  "time/DualRangeComponent.mjs",
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
const timeContext = new TimeContext()
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
const eventFactory = new RR0EventFactory()
const sightingFactory = new TypedDataFactory(eventFactory, "sighting", ["index"])
const orgFactory = new OrganizationFactory(eventFactory)
const caseFactory = new CaseFactory(eventFactory)
const peopleFactory = new PeopleFactory(eventFactory)
const apiFactory = new APIFactory(eventFactory)
const bookFactory = new TypedDataFactory(eventFactory, "book")
const articleFactory = new TypedDataFactory(eventFactory, "article")
const dataService = new AllDataService(
  [orgFactory, caseFactory, peopleFactory, bookFactory, articleFactory, sightingFactory, apiFactory])
dataService.getFromDir("", ["people", "case"]).then(data => {
  console.debug(data)
})

const timeTextBuilder = new TimeTextBuilder(timeFormat)
const timeService = new TimeService(dataService, timeTextBuilder)

const peopleService = new PeopleService(dataService, peopleFactory)

const apiKey = process.env.GOOGLE_MAPS_API_KEY
if (!apiKey) {
  throw Error("GOOGLE_MAPS_API_KEY is required")
}
context.setVar("mapsApiKey", apiKey)
const placeService = new GooglePlaceService("place", apiKey)

const orgService = new OrganizationService([], "org", undefined)

timeService.getFiles().then(async (timeFiles) => {
  context.setVar("timeFilesCount", timeFiles.length)
  const timeElementFactory = new TimeElementFactory(timeService.renderer)
  const caseService = new CaseService(dataService, caseFactory, timeElementFactory)
  const timeReplacer = new TimeReplacer(timeElementFactory)
  const peopleList = await peopleService.getAll()
  context.setVar("peopleFilesCount", peopleList.length)
  const bookMeta = new Map<string, HtmlMeta>()
  const bookLinks = new Map<string, HtmlLinks>()
  const ufoCasesStep = await CaseDirectoryStep.create(outputFunc, config, caseService)
  const peopleDirectoryFactory = new PeopleDirectoryStepFactory(outputFunc, config, peopleService)
  const peopleSteps = await peopleDirectoryFactory.create()
  // Publish case.json files so that vraiufo.com will find them
  copies.push(...(ufoCasesStep.config.rootDirs).map(dir => path.join(dir, "case.json")))
  await FileUtil.writeFile(path.join(outDir, "casesDirs.json"), JSON.stringify(ufoCasesStep.config.rootDirs), "utf-8")
  copies.push(...(peopleSteps.reduce((rootDirs, peopleStep) => {
    rootDirs.push(...peopleStep.config.rootDirs)
    return rootDirs
  }, [])).map(dir => path.join(dir, "people.json")))
  await FileUtil.writeFile(path.join(outDir, "peopleDirs.json"),
    JSON.stringify(peopleList.map(people => people.dirName)), "utf-8")

  const searchVisitor = new SearchVisitor({notIndexedUrls: ["404.html", "Referencement.html"], indexWords: false},
    timeTextBuilder)
  const sourceRenderer = new SourceRenderer(timeTextBuilder)
  const sourceRegistryFileName = "source/index.json"
  const baseUrl = "https://rr0.org"
  const http = new HttpSource()
  const sourceFactory = new PersistentSourceRegistry(dataService, http, baseUrl, sourceRegistryFileName, timeFormat)
  const noteCounter = new NoteFileCounter()
  const noteRenderer = new NoteRenderer(noteCounter)
  const caseRenderer = new CaseSummaryRenderer(noteRenderer, sourceFactory, sourceRenderer)
  const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
  // const actions: ChronologyReplacerActions = {read: [], write: ["backup"]}
  const databaseAggregationCommand = new DomReplaceCommand(".contents ul",
    new ChronologyReplacerFactory(timeService,
      [rr0Mapping /*new GeipanRR0Mapping(actions)
        /*, baseOvniFranceRR0Mapping, fuforaRR0Mapping, nuforcRR0Mapping, urecatRR0Mapping*/
      ], caseRenderer)
  )
  const timeDefaultHandler = (context: HtmlRR0SsgContext): string | undefined => {
    let title: string | undefined
    title = Time.titleFromFile(context, context.file.name, timeTextBuilder)
    return title
  }
  const pageReplaceCommands = [
    new BaseReplaceCommand("/"),
    new LanguageReplaceCommand(),
    new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright]),
    new StringEchoVarReplaceCommand(),
    new AngularExpressionReplaceCommand(),
    new SsiIfReplaceCommand(),
    new SsiSetVarReplaceCommand("title", (_match: string, ...args: any[]) => `<title>${args[0]}</title>`),
    new SsiSetVarReplaceCommand("url",
      (_match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
    new SsiLastModifiedReplaceCommand(timeFormat),
    new SsiTitleReplaceCommand([timeDefaultHandler]),
    new DescriptionReplaceCommand("UFO data for french-reading people", "abstract"),
    new AuthorReplaceCommand(timeService)
  ]
//  const sourceCounter = new SourceFileCounter()
  const sourceCounter = new SourceFileCounter()
  const sourceReplacer = new SourceReplacer(sourceRenderer, sourceFactory, sourceCounter)
  const sourceReplacerFactory = new SourceReplacerFactory(sourceReplacer)
  const noteReplacer = new NoteReplacer(noteRenderer)
  const noteReplacerFactory = new NoteReplacerFactory(noteReplacer)
  const eventReplacer = new EventReplacer(caseRenderer, dataService)
  const contentsReplaceCommand = [
    new ClassDomReplaceCommand(new EventReplacerFactory(eventReplacer), "event"),
    new ClassDomReplaceCommand(sourceReplacerFactory, "source"),
    new DomReplaceCommand("time", new TimeReplacerFactory(timeReplacer)),
    new DomReplaceCommand("code", new CodeReplacerFactory()),
    new ClassDomReplaceCommand(new PeopleReplacerFactory(peopleService), "people"),
    new ClassDomReplaceCommand(new PlaceReplacerFactory(), "place"),
    new ClassDomReplaceCommand(new WitnessReplacerFactory(), "temoin", "temoin1", "temoin2", "temoin3"),
    new ClassDomReplaceCommand(noteReplacerFactory, "note"),
    new ClassDomReplaceCommand(new IndexedReplacerFactory(), "indexed"),
    new UnitReplaceCommand(),
    new MetaLinkReplaceCommand(new TimeLinkDefaultHandler(timeFiles, timeTextBuilder)),
    databaseAggregationCommand
  ]
  const ssg = new Ssg(config)
  const getOutputPath = (context: SsgContext): string => path.join(outDir, context.file.name)
  const force = args.force === "true"
  const toProcess = new Set<string>(
    ["people/index.html", "people/witness/index.html", "people/militaires.html", "people/scientifiques.html", "people/astronomes.html", "people/politicians.html", "people/dirigeants.html", "people/pilotes.html", "people/contactes.html", "people/ufologues.html", "tech/info/Personnes.html", "people/Contributeurs.html"])
  const includeStep = new RR0ContentStep(
    [htAccessToNetlifyConfig, {roots: contentRoots, replacements: [new SsiIncludeReplaceCommand()], getOutputPath}],
    outputFunc, [], [], force, "content includes", toProcess
  )
  ssg.add(includeStep)
  ssg.add(ufoCasesStep)
  ssg.add(...peopleSteps)
  if (contentRoots) {
    const contentVisitor = new DefaultContentVisitor(dataService, caseRenderer, timeElementFactory)
    const contentVisitors: ContentVisitor[] = [contentVisitor, searchVisitor]
    if (args.books) {
      contentVisitors.push(new BookContentVisitor(bookMeta, bookLinks))
    }
    const contentReplacements = [
      ...pageReplaceCommands,
      ...contentsReplaceCommand,
      new OutlineReplaceCommand(),
      new AnchorReplaceCommand(siteBaseUrl,
        [new CaseAnchorHandler(caseService, timeTextBuilder), new DataAnchorHandler(dataService)]),
      new ImageCommand(outDir, 275, 500),
      new OpenGraphCommand(outDir, timeFiles, baseUrl, timeTextBuilder)
    ]
    ssg.add(new RR0ContentStep([{roots: contentRoots, replacements: contentReplacements, getOutputPath}],
      outputFunc, [], contentVisitors, force, "contents replacements", toProcess))
  }
  if (args.books) {
    ssg.add(await BookDirectoryStep.create(outputFunc, config, bookMeta, bookLinks))
  }
  const reindex = args.reindex?.split(",")
  if (reindex?.includes("search")) {
    ssg.add(new SearchIndexStep("search/index.json", searchVisitor))
  }
  if (reindex?.includes("sources")) {
    ssg.add(new SourceIndexStep(sourceRegistryFileName, sourceFactory))
  }
  if (copies) {
    const copyConfig: CopyStepConfig = {
      getOutputPath,
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
