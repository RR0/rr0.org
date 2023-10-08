import { HtmlRR0SsgContext, RR0SsgContext } from '../RR0SsgContext';
import { DirectoryStep, OutputFunc, SsgConfig, SsgFile } from 'ssg-api';
import { RR0FileUtil } from '../util/file/RR0FileUtil';
import { Book } from './Book';
import { StringUtil } from '../util/string/StringUtil';
import { HtmlTag } from '../util/HtmlTag';
import { Time } from '../time/Time';
import fs from 'fs';
import path from 'path';

/**
 * Scan directories for book information, then populates a template with collected data.
 */
export class BookDirectoryStep extends DirectoryStep {

  constructor(dirs: string[], template: string, protected outputFunc: OutputFunc,
              config: SsgConfig, name = 'books') {
    super(dirs, [], template, config, name);
  }

  static async create(outputFunc: OutputFunc, config: SsgConfig): Promise<BookDirectoryStep> {
    const dirs = await RR0FileUtil.findDirectoriesContaining('book*.json');
    const excludedDirs = [];
    return new BookDirectoryStep(
      dirs,
      'book/index.html',
      outputFunc, config,
      'all books'
    );
  }

  protected async processDirs(context: HtmlRR0SsgContext, dirNames: string[]): Promise<void> {
    const books = this.read(context, dirNames);
    const directoriesHtml = this.toList(context, books);
    context.outputFile.contents = context.outputFile.contents.replace(`<!--#echo var="directories" -->`,
      directoriesHtml);
    await this.outputFunc(context, context.outputFile);
  }

  protected read(context: HtmlRR0SsgContext, dirNames: string[]): Book[] {
    const books: Book[] = [];
    for (const dirName of dirNames) {
      const dirBook: Book = {dirName, authors: [], publication: {publisher: '', time: ''}, summary: '', title: ''};
      books.push(dirBook);
      try {
        const jsonFileInfo = SsgFile.read(context, `${dirName}/book.json`);
        Object.assign(dirBook, JSON.parse(jsonFileInfo.contents));
      } catch (e) {
        console.warn(`${dirName} has no book*.json description`);
      }
    }
    return books;
  }

  /**
   * Convert an array of Case[] to an <ul> HTML unordered list.
   *
   * @param context
   * @param books
   */
  protected toList(context: RR0SsgContext, books: Book[]) {
    const listItems = books.map(dirBook => {
      if (!dirBook.title) {
        const lastSlash = dirBook.dirName.lastIndexOf('/');
        const lastDir = dirBook.dirName.substring(lastSlash + 1);
        dirBook.title = StringUtil.camelToText(lastDir);
      }
      return this.toListItem(context, dirBook);
    });
    return HtmlTag.toString('ul', listItems.join('\n'), {class: 'links'});
  }

  /**
   * Convert a Case object to an HTML list item.
   *
   * @param context
   * @param dirBook
   */
  protected toListItem(context: RR0SsgContext, dirBook: Book) {
    const attrs: { [name: string]: string } = {};
    const titles = [];
    const details: string[] = [];
    const authors = dirBook.authors;
    const authorStr = authors ? authors.join(' & ') + ': ' : '';
    const timeStr = dirBook.publication.time;
    if (timeStr) {
      const timeDetail = Time.dateFromIso(timeStr).getFullYear();
      details.push(HtmlTag.toString('time', timeDetail.toString()));
    }
    const text: (string | string[])[] = [authorStr, dirBook.title];
    if (details.length > 0) {
      text.push(`(${details.join(', ')})`);
    }
    const innerHTML = text.join(' ').trim();
    const a = fs.existsSync(path.join(dirBook.dirName, 'index.html')) ? HtmlTag.toString('a', innerHTML,
      {href: '/' + dirBook.dirName + '/'}) : innerHTML;
    if (titles.length) {
      attrs.title = titles.join(', ');
    }
    return HtmlTag.toString('li', a, attrs);
  }
}
