import common, {SelectorDirective} from "./common"

export class ContextModule {

  constructor() {
    common.directives.push(new class extends SelectorDirective {
      protected handle(el: HTMLElement) {
      }
    }(".place"))
    common.directives.push(new class extends SelectorDirective {
      protected handle(el: HTMLElement) {
      }
    }("time"))
  }
}

const context = new ContextModule()
export default context
