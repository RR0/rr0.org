describe("People service", function () {
  "use strict";

  var $compile;
  var $rootScope;
  var peopleService;

  beforeEach(angular.mock.module('rr0.people'));

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_, _peopleService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    peopleService = _peopleService_;
  }));

  it('deduces people link', function () {
    var peopleLink = peopleService.peopleLink('BerlitzCharles');
    expect(peopleLink).toEqual('/people/b/BerlitzCharles');
  });
  it('supports people with a unique name', function () {
    var peopleLink = peopleService.peopleLink('Platon');
    expect(peopleLink).toEqual('/people/p/Platon');
  });
  it('supports people names with accents', function () {
    var peopleLink = peopleService.peopleLink('Jérôme Beau');
    expect(peopleLink).toEqual('/people/b/BeauJerome');
  });
  it('deduces link for people with middle name', function () {
    var peopleLink = peopleService.peopleLink('Josef Allen Hynek');
    expect(peopleLink).toEqual('/people/h/HynekJosefAllen');
  });
});

describe("People directive", function () {
  'use strict';

  var $compile;
  var $rootScope;

  beforeEach(angular.mock.module('rr0.people'));
  org.rr0.context.language = 'fr';

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('deduces people link', function () {
    var element = $compile("<span class='people'>Charles Berlitz</span>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('"/people/b/BerlitzCharles" translate="no"');
  });
  it('supports title attribute as disambiguation', function () {
    var element = $compile("<span class='people' title='Josef Allen Hynek'>J. A. Hynek</span>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('/people/h/HynekJosefAllen');
  });
  it('supports object as a parameter', function () {
    $rootScope.author = {
      name: 'John Malkovitch'
    };
    var element = $compile("<span people='author'></span>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('/people/m/MalkovitchJohn');
  });
});