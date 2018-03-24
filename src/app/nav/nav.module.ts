import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
//import { LangModule } from '../lang.module';
//import { TimeModule } from '../time/time.module';
//import { PeopleModule } from '../people/people.module';
import {NetModule} from '../net.module';
import {NetService} from '../Net.service';
import {LangService} from '../lang.service';
import {CommonsService} from '../Commons.service';
import {TimeService} from '../time/Time.service';
import {PeopleService} from '../people/people.service';
import {PageComponent} from './page/page.component';
import {HeaderComponent} from './rr0-header.component';
import {HomeComponent} from './home/home.component';
import {RedirectComponent} from './redirect/Redirect.component';
import {PageNotFoundComponent} from './notfound/PageNotFound.component';

export const host = location.host;
export const hiddenPos = '-100em';

@NgModule({
  imports: [CommonModule, NetModule, /*LangModule, PeopleModule, TimeModule*/],
  declarations: [HeaderComponent, PageComponent, HomeComponent, PageNotFoundComponent, RedirectComponent],
  entryComponents: [HeaderComponent, PageComponent],
  providers: [NetService, CommonsService, TimeService, LangService, PeopleService]
})
export class NavModule {
};
