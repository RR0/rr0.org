import {AnchorDirective} from "./rr0-a.directive";
import {ElementRef} from "@angular/core";
import {inject, TestBed} from "@angular/core/testing";

describe('AnchorDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        //more providers
        { provide: ElementRef }
      ]
    }).compileComponents();
  });

  it('should create an instance', inject([ElementRef], (elementRef: ElementRef) => {
    const directive = new AnchorDirective(elementRef);
    expect(directive).toBeTruthy();
  }));

  /*it('should convert strings into valid links', inject([NavService], (navService: NavService) => {

    beforeEach(angular.mock.inject(() =>{
      navService.host = 'rr0.org';
    }));

    it('detect inner links', function () {
      var element = $compile("<a href=\"https://rr0.org/path/file.html\">same site link</a>")($rootScope);
      $rootScope.$digest();
      expect(element[0].target).not.toEqual("_blank");
    });
    it('detect local links', function () {
      var element = $compile("<a href=\"#anchor\">local anchor</a>")($rootScope);
      $rootScope.$digest();
      expect(element[0].target).not.toEqual("_blank");
    });
    it('detect outer links', function () {
      var element = $compile("<a href=\"http://example.com/path/file.html\">external link</a>")($rootScope);
      $rootScope.$digest();
      expect(element[0].target).toEqual("_blank");
    });
  });*/
});