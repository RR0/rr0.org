import {directives} from "./common"
import {SelectorDirective} from "./note/foot"

export class ContextModule {

  constructor() {
    directives.push(new class extends SelectorDirective {
      protected handle(el: HTMLElement) {
      }
    }(".place"))
    directives.push(new class extends SelectorDirective {
      protected handle(el: HTMLElement) {
      }
    }("time"))
  }
}

const context = new ContextModule()
export default context
