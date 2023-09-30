import { TimeContext } from './time/TimeContext';
import { CaseDirectoryStep } from './science/crypto/ufo/enquete/dossier/CaseDirectoryStep';
import { PeopleDirectoryStep } from './people/PeopleDirectoryStep';
import { promise as glob } from 'glob-promise';
import { GooglePlaceService } from './place/GooglePlaceService';
import { OrganizationService } from './org/OrganizationService';
import { RR0SsgContextImpl } from './RR0SsgContext';
import { CLI } from './util/cli/CLI';
import {
  AngularExpressionReplaceCommand,
  ClassDomRegexReplaceCommand,
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  HtAccessToNetlifyConfigReplaceCommand,
  HtmlTagReplaceCommand,
  Ssg,
  SsgConfig,
  SsgContext,
  SsgFile,
  SsiEchoVarReplaceCommand,
  SsiIfReplaceCommand,
  SsiIncludeReplaceCommand,
  SsiLastModifiedReplaceCommand,
  SsiSetVarReplaceCommand,
  StringEchoVarReplaceCommand
} from 'ssg-api';
import { LanguageReplaceCommand } from './lang/LanguageReplaceCommand';
import { SsiTitleReplaceCommand } from './time/SsiTitleReplaceCommand';
import { PeopleReplacerFactory } from './people/PeopleReplacerFactory';
import { SourceReplacerFactory } from './source/SourceReplacerFactory';
import { timeDefaultHandler } from './time/TimeDefaultTitle';
import { NoteReplacerFactory } from './note/NoteReplacerFactory';
import { WitnessReplacerFactory } from './people/witness/WitnessReplacerFactory';
import { AnchorReplaceCommand } from './anchor/AnchorReplaceCommand';
import { TimeLinkDefaultHandler } from './time/TimeLinkDefaultHandler';
import { AuthorReplaceCommand } from './people/author/AuthorReplaceCommand';
import { rr0DefaultCopyright } from './RR0DefaultCopyright';
import { PlaceReplacerFactory } from './place/PlaceReplacerFactory';
import { TimeReplacerFactory } from './time/TimeReplacerFactory';
import { LinkReplaceCommand } from './LinkReplaceCommand';
import { OutlineReplaceCommand } from './outline/OutlineReplaceCommand';
import { RR0ContentStep } from './RR0ContentStep';
import { ImageRegistryCommand } from './ImageRegistryCommand';
import { SearchCommand } from './search/SearchCommand';
import { SearchIndexStep } from './search/SearchIndexStep';
import { OutputFunc } from 'ssg-api/dist/src/Ssg';
import { BaseReplaceCommand } from './BaseReplaceCommand';
import { OpenGraphCommand } from './OpenGraphCommand';
import { DescriptionReplaceCommand } from './DescriptionReplaceCommand';

const args = new CLI().getArgs();
const cliContents = args.contents;
const contentRoots = cliContents
  ? cliContents.split(',')
  : [
    'croyance/**/*.html',
    'index.html', '404.html', 'googlebe03dcf00678bb7c.html', 'Contact.html', 'Copyright.html', 'preambule.html', 'FAQ.html', 'Referencement.html',
    'time/**/*.html',
    'droit/**/*.html',
    'org/**/*.html',
    'people/**/*.html',
    'place/**/*.html',
    'politique/**/*.html',
    'science/**/*.html',
    'tech/**/*.html',
    'politique/**/*.html',
    'udb/*.html',
    'js/**/*.html'
  ];
const copiesArg = args.copies;
const copies = copiesArg ? copiesArg.split(',') : [
  'favicon.ico', 'manifest.json', 'opensearch.xml', 'apple-touch-icon.png', 'apple-touch-icon_400x400.png', 'screenshot1.jpg',
  'rr0.css', 'print.css',
  'rr0.js',
  // "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  'people/index.js', 'people/lier.svg', 'people/index.css',
  'search/index.js', 'search/index.json',
  'udb/**/*.js',
  'udb/netlify.toml',
  'udb/input/db/udb/data/*.*'
];
const config: SsgConfig = {
  outDir: 'out'
};

const outputFunc: OutputFunc
  = async (context: SsgContext, info: SsgFile, outDir = config.outDir + '/'): Promise<void> => {
  // TODO: Fix this
  if (!info.name.startsWith(outDir)) {
    info.name = outDir + info.name;
  }
  try {
    context.log('Writing', info.name);
    await info.write();
  } catch (e) {
    context.error(info.name, e);
  }
};

const timeFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit'
};
const timeContext = new TimeContext(timeFormat);
const context = new RR0SsgContextImpl('fr', timeContext);
context.setVar('mail', 'rr0@rr0.org');

const siteBaseUrl = 'https://rr0.org/';
const htAccessToNetlifyConfig: ContentStepConfig = {
  replacements: [new HtAccessToNetlifyConfigReplaceCommand(siteBaseUrl)],
  roots: ['.htaccess'],
  getOutputFile(context: SsgContext): SsgFile {
    return SsgFile.read(context, 'netlify.toml', 'utf-8');
  }
};

async function getTimeFiles(): Promise<string[]> {
  const minusYearFiles = await glob('time/-?/?/?/?/index.html');
  const year1Files = await glob('time/?/index.html');
  const year2Files = await glob('time/?/?/index.html');
  const year3Files = await glob('time/?/?/?/index.html');
  const year4Files = await glob('time/?/?/?/?/index.html');
  const monthFiles = await glob('time/?/?/?/?/??/index.html');
  const dayFiles = await glob('time/?/?/?/?/??/??/index.html');
  return year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
    minusYearFiles).concat(monthFiles).concat(dayFiles).sort();
}

getTimeFiles().then(async (timeFiles) => {
  const ufoCasesStep = await CaseDirectoryStep.create(outputFunc, config);
  const peopleSteps = await PeopleDirectoryStep.create(outputFunc, config);

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw Error('GOOGLE_MAPS_API_KEY is required');
  }
  context.setVar('mapsApiKey', apiKey);
  const placeService = new GooglePlaceService('place', apiKey);

  const orgService = new OrganizationService('org');

  const searchCommand = new SearchCommand(['404.html', 'Referencement.html']);
  const baseUrl = 'https://rr0.org';
  const contentConfigs: ContentStepConfig[] = [
    htAccessToNetlifyConfig,
    {
      roots: contentRoots,
      replacements: [
        new SsiIncludeReplaceCommand(),
        new BaseReplaceCommand('/'),
        new LanguageReplaceCommand(),
        new StringEchoVarReplaceCommand('mail'),
        new StringEchoVarReplaceCommand('mapsApiKey'),
        new AngularExpressionReplaceCommand(),
        new SsiEchoVarReplaceCommand('copyright', [rr0DefaultCopyright]),
        new SsiIfReplaceCommand(),
        new SsiSetVarReplaceCommand('title', (match: string, ...args: any[]) => `<title>${args[0]}</title>`),
        new SsiSetVarReplaceCommand('url',
          (match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
        new SsiLastModifiedReplaceCommand(context.time.options),
        new SsiTitleReplaceCommand([timeDefaultHandler]),
        new AuthorReplaceCommand(timeFiles),
        new HtmlTagReplaceCommand('time', new TimeReplacerFactory(timeFiles)),
        new ClassDomReplaceCommand('people', new PeopleReplacerFactory()),
        new ClassDomReplaceCommand('place', new PlaceReplacerFactory(placeService, orgService)),
        new ClassDomRegexReplaceCommand('temoin(.?)', new WitnessReplacerFactory()),
        new ClassDomReplaceCommand('note', new NoteReplacerFactory()),
        new ClassDomReplaceCommand('source', new SourceReplacerFactory()),
        new LinkReplaceCommand(new TimeLinkDefaultHandler(timeFiles)),
        new OutlineReplaceCommand(),
        new AnchorReplaceCommand(siteBaseUrl),
        new DescriptionReplaceCommand('UFO data for french-reading people', 'abstract'),
        new ImageRegistryCommand(config.outDir, 275, 500),
        new OpenGraphCommand(config.outDir, timeFiles, baseUrl),
        searchCommand
      ],
      getOutputFile(context: SsgContext): SsgFile {
        return context.outputFile;
      }
    }
  ];
  new Ssg(config)
    .add(new RR0ContentStep(
      contentConfigs, outputFunc))
    .add(ufoCasesStep)
    .add(...peopleSteps)
    .add(new SearchIndexStep('search/index.json', searchCommand))
    .add(new CopyStep(copies, config))
    .start(context)
    .then(result => context.log('Completed', result))
    .catch(err => {
      try {
        context.error(err, context.inputFile.name, '=>', context.outputFile?.name);
      } catch (e) {
        context.error(err);
      }
    });
});
