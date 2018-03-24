import {NgModule} from '@angular/core';

import {NetModule} from './net.module';
import {LangService} from './lang.service';

@NgModule({
  imports: [NetModule],
  declarations: []
})
export class LangModule {
  constructor(langService: LangService) {
    langService.setLang();
  }
};
