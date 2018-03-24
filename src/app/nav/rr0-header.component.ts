import {Component, ElementRef, OnInit} from '@angular/core';

import {CommonsService, org} from '../Commons.service';
import {LangService} from '../lang.service';
import {NavService} from '../nav/Nav.service';
import {PeopleService} from '../people/people.service';
import {TimeService} from '../time/Time.service';

@Component({
  selector: 'rr0-header',
  templateUrl: './rr0-header.component.html',
  providers: [CommonsService, NavService]
})
export class HeaderComponent implements OnInit {
  title: string;
  ps = [];
  ns = [];
  sections = [];
  isFramed: boolean;
  nav;
  scrolled: HTMLElement;
  searchResults;
  outline: HTMLElement;
  text: HTMLElement;
  titleSection: {};
  currentSection;
  alternate;
  header: HTMLElement;

  constructor(private commonsService: CommonsService, private langService: LangService, private peopleService: PeopleService, private timeService: TimeService, private navService: NavService, private elem: ElementRef) {
  }

  ngOnInit() {
    this.isFramed = window !== top;
    const el = this.elem.nativeElement;

    this.scrolled = <HTMLElement>document.querySelector('.contents');
    this.header = <HTMLElement>document.querySelector('header');
    this.nav = el.querySelector('nav');
    this.text = <HTMLElement>this.scrolled.querySelector('.text');
    this.titleSection = {
      label: this.title,
      outlineLabel: this.title,
      id: 'top',
      level: 0,
      elem: document.querySelector('#top')
    };

    this.outline = <HTMLElement>document.querySelector('.outline');

    if (!this.title) {
      this.navService.setTitle(this.commonsService.capitalizeFirstLetter('' + (this.titleFromTime() || this.titleFromPeople() || this.titleFromURI())));
    }

    this.scrolled.onscroll = (event) => {
      requestAnimationFrame(this.updateHeading.bind(this));
    };

    if (window.addEventListener) {      // most non-IE browsers and IE9
      window.addEventListener('resize', this.onResize.bind(this), false);
    } else if ((<any>window).attachEvent) {    // Internet Explorer 5 or above
      (<any>window).attachEvent('onresize', this.onResize.bind(this));
    }

    this.init();

    /*$rootScope.$on('sectionAdded', function (event, section) {
      //            for (var i = 2; i < section.level; i++) {
      //                section.label = '&nbsp;&nbsp;' + section.label;
      //            }
      this.sections.push(section);
    });*/
    // $timeout(function () {
    this.updateHeading();
    this.updatePos();
    // });
  }

  getHeadingHeight() {
    return this.nav.offsetTop + this.getNavHeight();
  }

  initPeople(p) {
    this.peopleService.setPeopleName(p);
  }

  addNavElement(c) {
    return this.createNavElement(c);
  }

  titleClick() {
    if (this.isOutlineVisible()) {
      this.outline.classList.add('clicked');
    } else if (this.outline) {
      this.outline.classList.remove('clicked');
    }
  }

  init(s?, sLink?, c?, cLink?, p?, pLink?, n?, nLink?) {
    this.navInit(s, sLink, c, cLink, p, pLink, n, nLink);

    const startNav = this.navService.getStartNav();
    if (window === top) {
      this.addPrev(startNav, startNav.title, 'start');
      this.addPrev({
        label: '' + this.navService.getContents(),
        link: this.navService.getContentsURL()
      }, 'Table des mati\xE8res', 'toc');
      this.navService.getPrev().then(function (pp) {
        this.addPrev(pp, 'Pr\xE9c\xE9dent', 'prev');
      });
      this.navService.getNext().then(function (nn) {
        this.addNext(nn, 'Suivant', 'next');
      });
    } else {
      //        org.rr0.contentsZone.style.boxShadow = "0.4em 0.4em 0,8em rgb(200,200,200) inset";
      //        org.rr0.contentsZone.style.backgroundColor = "#e2e2e8";
    }

    this.alternate = null;
    const alternateClass = 'alternate';

    this.createNavElement(alternateClass);
    this.checkAlt();
  }

  initAuthor(a, aLink, c, cLink) {
    this.peopleService.addAuthor(a, aLink, c, cLink);
  }

  sectionClick(section) {
    this.scrollTo(section.id);
  }

  private isOutlineVisible() {
    return this.outline && this.outline.style.height !== '0px';
  }

  private onResize(event) {
    this.scrolled.onscroll(event);
    this.updatePos();
  }

  private scrollTo(id) {
    const anchor = document.getElementById(id);   // anchor.scrollIntoView(true, 'smooth');
    //hideOutline();
    this.smoothScroll(anchor, 500);
  }

  private smoothScroll(anchor, duration) {
    const easingPattern = function (percent) {
      return percent < 0.5 ? 4 * percent * percent * percent : (percent - 1) * (2 * percent - 2) * (2 * percent - 2) + 1; // acceleration until halfway, then deceleration
    };
    // Get the height of a fixed header if one exists
    const headerHeight = this.getHeadingHeight();

    // Calculate how far to scroll
    const startLocation = this.scrolled.scrollTop;
    const getEndLocation = function (anchor) {
      let location = 0;
      if (anchor.offsetParent) {
        do {
          location += anchor.offsetTop;
          anchor = anchor.offsetParent;
        } while (anchor);
      }
      location = location - headerHeight;
      return location >= 0 ? location : 0;
    };
    const endLocation = getEndLocation(anchor);
    const distance = endLocation - startLocation;

    let runAnimation;
    // Function to stop the scrolling animation
    const stopAnimationIfRequired = function () {
      if (this.scrolled.scrollTop === endLocation) {
        cancelAnimationFrame(runAnimation);
      }
    };
    // Set the animation variables to 0/undefined.
    let timeLapsed = 0;
    let percentage, position;

    const animateScroll = function () {
      runAnimation = requestAnimationFrame(animateScroll);
      timeLapsed += 16;
      percentage = timeLapsed / duration;
      percentage = percentage > 1 ? 1 : percentage;
      position = startLocation + distance * easingPattern(percentage);
      this.scrolled.scrollTop = position;
      stopAnimationIfRequired();
    };
    // Loop the animation function
    animateScroll();
  }

  private updateSearchPos(triggerSelector) {
    const trigger = document.querySelector(triggerSelector);
    if (trigger) {
      if (!this.searchResults) {
        this.searchResults = document.querySelector('.search-result');
      }
      if (this.searchResults) {
        this.searchResults.style.top = (trigger.offsetTop + trigger.offsetHeight) + 'px';
        this.searchResults.style.left = '';
      }
    }
  }

  private updateOutlinePos(triggerSelector) {
    if (this.isNavLeft()) {
      this.outline.style.top = '0';
    } else {
      const trigger = document.querySelector(triggerSelector);
      if (trigger && this.outline) {
        this.outline.style.top = (trigger.offsetTop + trigger.offsetHeight) + 'px';
      }
    }
  }

  private updatePos() {
    this.updateOutlinePos('.outline-title');
    this.updateSearchPos('.search form');
  }

  private updateHeading() {
    const isNavCollapsed = this.nav.classList.contains('collapsed');
    if (this.isHeaderVisible()) {
      if (isNavCollapsed || !this.outline) {
        this.nav.classList.remove('collapsed');
        this.text.style.paddingTop = '0';
        //this.$apply(function () {
        // if (outline && outline.childElementCount > 0) {
        this.setOutline('Sommaire');
        /* } else {
         setOutline('');
         }*/
        //});
        this.selectOutline(null);
        this.updatePos();
      }
    } else {
      if (isNavCollapsed) {
        this.updateOutline();
      } else {
        this.nav.classList.add('collapsed');
        this.text.style.paddingTop = this.getNavHeight() + 'px';
        //this.$apply(function () {
        this.setOutline(this.title);
        //});
        this.selectOutline(this.titleSection);
        this.updatePos();
      }
    }
  }

  private unselect(sec) {
    if (sec) {
      sec.removeClass('hovered');
    }
  }

  private select(toSelect) {
    let toSelectElem;
    if (toSelect) {
      toSelectElem = document.querySelector('#out-' + toSelect.id);
      /*if (currentSection && toSelectElem[0] === currentSection[0]) {
       return;
       }*/
      toSelectElem.classList.add('hovered');
    }
    return toSelectElem;
  }

  private selectOutline(newSelection) {
    this.unselect(this.currentSection);
    this.currentSection = this.select(newSelection);
  }

  private updateOutline() {
    let lastSec = this.titleSection;
    let newSec;
    if (this.sections.length) {
      for (let i = 0; i < this.sections.length; i++) {
        newSec = this.sections[i];
        let found;
        found = this.scrolled.scrollTop > newSec.elem[0].offsetTop;
        if (lastSec) {
          if (!found) {
            this.selectOutline(lastSec);
            return;
          }
        }
        lastSec = newSec;
      }
      this.selectOutline(newSec);
    }
  }

  private navInit(s, sLink, c, cLink, p, pLink, n, nLink) {
    const onLoadDo = this.navService.setStart(s, sLink);
    if (window === top) {
      this.navService.addRel(sLink, 'Start');
    }
    //    if (onLoadDo) domLoadProcs.push(onLoadDo);
    this.navService.setContents(c, cLink);
    this.navService.setPrev(p, pLink);
    this.navService.setNext(n, nLink);
  }

  private setAlternates(innerHtml: string) {
    this.alternate = innerHtml;
  }

  private checkAlt() {
    if (!this.alternate) {
      this.alternate = ' ';
      this.langService.checkAlternate(this.commonsService.getUri(),
        original => {
          this.setAlternates(original ? '<a href=\'' + original + '\'>&#8668; Texte d\'origine</a>' : '&#9888; Ce document est une traduction');
        },
        translation => {
          this.setAlternates(translation ? '<a href=\'' + translation + '\'>&#8669; Traduction fran\xE7aise</a>' : '&#9888; Pas de traduction disponible');
        });
    }
  }

  private isNavLeft() {
    return this.nav.offsetHeight === this.scrolled.offsetHeight;
  }

  private getNavHeight() {
    return this.isNavLeft() ? 0 : this.nav.offsetHeight;
  }

  private titleFromTime() {
    let title = this.timeService.getYear();
    if (title) {
      if (this.timeService.getTime().month) {
        title = this.timeService.monthName() + ' ' + title;
        const dayOfMonth = this.timeService.getDayOfMonth();
        if (dayOfMonth) {
          title = this.timeService.dayOfWeekName(this.timeService.getDayOfWeek()) + ' ' + dayOfMonth + ' ' + title;
        }
      }
    }
    return title;
  }

  private createNavElement(c) {
    let li = document.getElementsByClassName(c)[0];
    if (!li) {
      li = document.createElement('li');
      c = !(!c) ? org.constantClass + ' ' + c : org.constantClass;
      li.setAttribute('class', c);
      this.navService.getNavList().appendChild(li);
    }
    return li;
  }

  private titleFromPeople() {
    let title;
    const p = this.peopleService.getPeople();
    if (p) {
      title = p.toString();
    }
    return title;
  }

  private titleFromURI(): string {
    let title: string;
    const uri = this.commonsService.getUri();
    const ls = uri.lastIndexOf('/');
    const htmlExt = uri.lastIndexOf('.html');
    if (htmlExt > 0 && uri.substring(htmlExt - 5, htmlExt) !== 'index') {
      title = uri.substring(ls + 1, htmlExt);
    } else if (ls < uri.length - 1) {
      let ps = ls - 1;
      while (uri.charAt(ps) !== '/') {
        ps--;
      }
      title = uri.substring(ps + 1, ls).toUpperCase();  // Accronym assumed
    } else {
      title = uri.substring(ls + 1);
    }
    return title;
  }

  private addPrev(pp, tt, c) {
    this.ps.push({
      label: this.commonsService.capitalizeFirstLetter('' + pp.label),
      link: pp.link,
      title: tt,
      style: c
    });
  }

  private addNext(nn, tt, c) {
    this.ns.push({
      label: this.commonsService.capitalizeFirstLetter('' + nn.label),
      link: nn.link,
      title: tt,
      style: c
    });
  }

  private isHeaderVisible() {
    return window === top && this.scrolled.scrollTop <= this.header.offsetHeight;
  }

  private setOutline(outlineHTML) {
    this.outline = outlineHTML;
  }
}
