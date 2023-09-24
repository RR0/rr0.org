import { PeopleFactory } from './PeopleFactory';
import { KnownPeople } from './People';

describe('PeopleFactory', () => {

  test('build people with one first name', () => {
    const factory = new PeopleFactory(['people/b/BeauJerome']);
    expect(factory.createFromFullName('Jérôme Beau')).toEqual(new KnownPeople(
      ['Jérôme'],
      'Beau',
      [],
      [],
      [],
      false,
      undefined,
      undefined));
  });

  test('build people with two first names', () => {
    const factory = new PeopleFactory(['people/b/BeauJeromePierre']);
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
    const factory = new PeopleFactory(['people/v/VonBraunWerner']);
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
    const factory = new PeopleFactory(['people/c/CondonEdwardU']);
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
    const factory = new PeopleFactory(['people/h/HynekJosefAllen']);
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
    const factory = new PeopleFactory(['people/a/Aristote']);
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
