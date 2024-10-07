import { HtmlRR0SsgContext } from "../RR0SsgContext.js"
import { LinkType } from "ssg-api"
import path from "path"
import { glob } from "glob"

export class Chapter {

  readonly context: HtmlRR0SsgContext;

  subs: Chapter[] = [];

  constructor(parentContext: HtmlRR0SsgContext, protected startFileName: string) {
    this.context = parentContext.clone();
  }

  async scan() {
    this.context.read(this.startFileName)
    const dir = path.dirname(this.context.file.name)
    const fileName = path.basename(this.context.file.name)
    const subFileNames = await glob(path.join(dir, '*/', fileName));
    this.subs = [];
    for (const subFileName of subFileNames) {
      const subChapter = new Chapter(this.context, subFileName);
      this.subs.push(subChapter);
      await subChapter.scan();
    }
  }

  toString(prefix = '- '): string {
    const file = this.context.file
    return `${prefix + file.name}: "${file.title}", meta=${JSON.stringify(file.meta)}, links=${JSON.stringify(
      file.links)}
${this.subs.map(subFile => subFile.toString('  ' + prefix)).join('')}`;
  }

  async update(parent?: Chapter) {
    const file = this.context.file
    const meta = file.meta;
    const links = file.links;
    if (parent) {
      const parentFile = parent.context.file
      const parentMeta = parentFile.meta;
      meta.author = parentMeta.author;
      meta.copyright = parentMeta.copyright;
      links.contents = {
        type: LinkType.contents,
        url: path.join("/", parentFile.name),
        text: parentFile.title
      };
      links.start = parentFile.links.start;
    } else {
      links.start = {
        type: LinkType.start,
        url: path.join("/", this.startFileName),
        text: file.title
      };
    }
    let prev: Chapter | undefined;
    for (const sub of this.subs) {
      const subFile = sub.context.file
      if (prev) {
        prev.context.file.links.next = {
          type: LinkType.next,
          url: path.join("/", subFile.name),
          text: subFile.title
        };
      }
      sub.context.file.links.prev = prev ? {
        type: LinkType.prev,
        url: path.join("/", prev.context.file.name),
        text: prev.context.file.title
      } : undefined;
      await sub.update(this);
      prev = sub;
    }
  }
}

/*
const args = new CLI().getArgs();
const startFileName = args.start;

const context = new RR0SsgContextImpl('fr', new TimeContext({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }
));
const file = HtmlFileContents.read(context, startFileName);
const startFileNames = [file.name];
const variants = file.lang.variants;
for (const variant of variants) {
  const parsed = path.parse(startFileName);
  const variantFileName = path.join(parsed.dir, `${parsed.name}_${variant}${parsed.ext}`);
  startFileNames.push(variantFileName);
}
for (const startFileName of startFileNames) {
  const chapter = new Chapter(context as unknown as HtmlRR0SsgContext, startFileName);
  chapter.scan().then(async () => {
    console.log('*** Before:\n', chapter.toString());
    await chapter.update();
    console.log('\n*** After:\n', chapter.toString());
  }).catch(e => {
    console.error(e);
  });
}

*/
