import {TestBed, inject} from '@angular/core/testing';
import {CommonsService} from "./Commons.service";

describe("Common service", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonsService]
    });
  });

  it('convert strings into valid links', inject([CommonsService], (commonsService: CommonsService) => {
      expect(commonsService.validLink('Bjørn')).toEqual("Bjorn");
      expect(commonsService.validLink('MaussánJaime')).toEqual("MaussanJaime");
      expect(commonsService.validLink('Jérôme Beau')).toEqual("JeromeBeau");
    }));
});