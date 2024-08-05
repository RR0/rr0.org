import { PeopleService } from "./PeopleService"
import { People } from "./People"
import { describe, expect, test } from "@javarome/testscript"

describe('PeopleFactory', () => {

  test('build people with one first name', () => {
    const factory = new PeopleService(["people/b/BeauJerome"], dataService, peopleFactory)
    expect(factory.createFromFullName("Jérôme Beau")).toEqual(new People(
      ['Jérôme'],
      'Beau',
      [],
      [],
      [],
      false,
      undefined,
      undefined,
      undefined,
      'people/b/BeauJerome'
    ));
  });

  test('build people with two first names', () => {
    const factory = new PeopleService(["people/b/BeauJeromePierre"], dataService, peopleFactory)
    expect(factory.createFromFullName('Jérôme Pierre Beau')).toEqual({
      title: 'Beau, Jérôme Pierre',
      countries: [],
      lastName: 'Beau',
      firstNames: ['Jérôme', 'Pierre'],
      hoax: false,
      discredited: false,
      dirName: 'people/b/BeauJeromePierre',
      occupations: [],
      pseudonyms: []
    });
  });

  test('build people with two last names', () => {
    const factory = new PeopleService(["people/v/VonBraunWerner"], dataService, peopleFactory)
    expect(factory.createFromFullName('Werner VonBraun')).toEqual({
      title: 'Von Braun, Werner',
      countries: [],
      lastName: 'VonBraun',
      firstNames: ['Werner'],
      hoax: false,
      discredited: false,
      dirName: 'people/v/VonBraunWerner',
      occupations: [],
      pseudonyms: []
    });
  });

  test('build people with one initial first names', () => {
    const factory = new PeopleService(["people/c/CondonEdwardU"], dataService, peopleFactory)
    expect(factory.createFromFullName('Edward U. Condon')).toEqual({
      title: 'Condon, Edward U.',
      countries: [],
      lastName: 'Condon',
      firstNames: ['Edward', 'U.'],
      hoax: false,
      discredited: false,
      dirName: 'people/c/CondonEdwardU',
      occupations: [],
      pseudonyms: []
    });
  });

  test('build people with last name first', () => {
    const factory = new PeopleService(["people/h/HynekJosefAllen"], dataService, peopleFactory)
    expect(factory.createFromFullName('Hynek, Josef Allen')).toEqual({
      title: 'Hynek, Josef Allen',
      countries: [],
      lastName: 'Hynek',
      firstNames: ['Josef', 'Allen'],
      hoax: false,
      discredited: false,
      dirName: 'people/h/HynekJosefAllen',
      occupations: [],
      pseudonyms: []
    });
  });

  test('Single name', () => {
    const factory = new PeopleService(["people/a/Aristote"], dataService, peopleFactory)
    expect(factory.createFromFullName('Aristote')).toEqual({
      title: 'Aristote',
      countries: [],
      lastName: 'Aristote',
      firstNames: [],
      hoax: false,
      discredited: false,
      dirName: 'people/a/Aristote',
      occupations: [],
      pseudonyms: []
    });
  });
});
