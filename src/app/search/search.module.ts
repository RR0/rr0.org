import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './rr0-search.component';
import { SearchService } from './search.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SearchComponent],
  entryComponents: [SearchComponent],
  providers: [SearchService],
  exports: [SearchComponent]
})
export class SearchModule { };