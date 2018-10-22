import { Component, OnInit, ElementRef } from '@angular/core';

import { SearchService } from './search.service';

@Component({
  selector: 'rr0-search',
  templateUrl: './rr0-search.component.html',
  providers: [SearchService]
})
export class SearchComponent {

  searchInput: string;
  searchResults;

  constructor(el: ElementRef, private searchService: SearchService) {
    this.searchInput = '';
  }

  doSearch() {
    this.searchService.search(this.searchInput).subscribe((data:any) => {
      // this.searchResults = [];
      if (data.searchInformation.totalResults > 0) {
        this.searchResults = data.items;
      } else {
        console.log("No results for '" + this.searchInput + "'");
      }
      });
  }

  searchKey(event, item) {
    console.log(event)
    if (event.keyCode === 40) {
      this.searchClick(item);
    }
  }

  searchClick(item) {
    document.body.className += ' wait';
    //$timeout(function () {
      (<any>window).location = item.link;
    //}, 10);
  }
}
