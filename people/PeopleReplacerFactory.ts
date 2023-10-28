import { PeopleReplacer } from './PeopleReplacer';
import { DomReplacer, ReplacerFactory } from 'ssg-api';
import { PeopleFactory } from './PeopleFactory';
import { HtmlRR0SsgContext } from '../RR0SsgContext';

/**
 * Creates replacers for people HTML in a given context.
 */
export class PeopleReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton?: PeopleReplacer

  async create(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    const instance = await this.getInstance()
    return {
      replace:
        (original: HTMLElement): Promise<HTMLElement> => {
          return instance.replacement(context, original)
        }
    }
  }

  protected async getInstance(): Promise<PeopleReplacer> {
    if (!this.singleton) {
      const factory = await PeopleFactory.getInstance()
      this.singleton = new PeopleReplacer(factory)
    }
    return this.singleton
  }
}
