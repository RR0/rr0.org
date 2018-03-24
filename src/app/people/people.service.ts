import {Injectable} from '@angular/core';

import {CommonsService, org} from '../Commons.service';

const peopleRoot = '/people/';

export class People {
  firstName: any;
  lastName: string;

  constructor(p) {
    'use strict';
    var commaPos = p.indexOf(', ');
    if (commaPos > 0) {
      this.lastName = p.substring(0, commaPos);
      this.firstName = p.substring(commaPos + 2);
    } else {
      var namesSplitPos = p.lastIndexOf(' ');
      this.firstName = p.substring(0, namesSplitPos);
      this.lastName = p.substring(namesSplitPos + 1);
    }
    this.toString = function () {
      return this.firstName + ' ' + this.lastName;
    };
  }
}

var handleWitness = function (scope, elem, attrs) {
  'use strict';
  var txt = elem.text();
  var e = elem[0];
  e.style.width = txt.length + 'em';
  var tint = 50 + (scope.witnessId * 10);
  var caviarBackgroundColor = 'rgb(' + tint + ', ' + tint + ', ' + tint + ')';
  e.style.background = 'linear-gradient(left, white, ' + caviarBackgroundColor + ' 2%, ' + caviarBackgroundColor + ' 98%, white);';
  e.innerHTML = '<a href="/FAQ.html#privacy">témoin' + (scope.witnessId ? ' ' + scope.witnessId : '') + '</a>';
  e.title = 'Nom du témoin anonymisé';
  if (e.id) {
    e.innerHTML += ' ' + e.id;
  }
};

(<any>window).copyright = null;

@Injectable()
export class PeopleService {
  copyright;
  authors = [];

  constructor(private commonsService: CommonsService) {
  }

  getCopyright() {
    return this.copyright;
  }

  getAuthors() {
    return this.authors;
  }

  setAuthor(a, aLink) {
    if (a) {
      var author = this.setPName(a);
      author.link = this.peopleLink(a, aLink);
      this.authors.push(author);
    }
  }

  setCopyright(c, cLink) {
    this.copyright = (<RR0Window>window).copyright = c;
  }

  addAuthor(a, aLink, c, cLink) {
    if (a) {
      this.setAuthor(a, aLink);
    }
    if (c) {
      this.setCopyright(c, cLink);
    }
  }

  setPeopleName(name) {
    this.setPName(name);
  }

  /**
   * @param {String} p People's name
   * @param {String} [pLink] a href link, or a symbolic link, or null
   */
  peopleLink(p, pLink) {
    if (p) {
      if (!pLink) {
        pLink = org.cache[p];
        if (!pLink) {
          this.setPName(p);
          pLink = org.cache[this.getPeople().lastName];
          if (!pLink) {
            p = (this.getPeople().lastName + this.getPeople().firstName);
            pLink = this.commonsService.validLink(p);
          } else {
            return pLink;
          }
        } else {
          return pLink;
        }
      }
      var firstLinkChar = pLink.charAt(0);
      if (firstLinkChar !== '.' && firstLinkChar !== '/') {
        pLink = peopleRoot + firstLinkChar.toLowerCase() + '/' + pLink;
      }
      pLink = this.commonsService.validLink(pLink);
      org.cache[p] = pLink;
      org.cache[this.getPeople().lastName] = pLink;
    } else {
      pLink = null;
    }
    return pLink;
  }

  getPeople() {
    return org.rr0.context.people;
  }

  private setPName(name) {
    if (name && name.length > 0) {
      org.rr0.context.people = new People(name);
      return org.rr0.context.people;
    }
  }
}
