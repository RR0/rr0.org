# RR0  [![Build Status](https://travis-ci.org/RR0/rr0.org.svg?branch=master)](https://travis-ci.org/RR0/rr0.org) [![Code Climate](https://codeclimate.com/github/RR0/rr0.org/badges/gpa.svg)](https://codeclimate.com/github/RR0/rr0.org) [![Test Coverage](https://codeclimate.com/github/RR0/rr0.org/badges/coverage.svg)](https://codeclimate.com/github/RR0/rr0.org)

This repository hosts both data and code for the [RR0 website](https://rr0.org).

## Motivation

This website was created around 1998 as the publication of personal notes regarding the study of Unidentified Flying Objects (UFOs).
It was further motivated by the lack of french-speaking resources at the time about the subject, especially when it comes to cases synthesis, history and objective reporting. There was just too many cases, people, organizations, places, etc. to remember, and their relationships was hard to remember.

## Analysis

### To do

* User settings to customize rendering of directives (i18n, how to display people names, which units to use for
  expressing measurements)

## Design

RR0 is:

* **Data-centric** : The pages are the data. They contain semantic only, not how to display them.
  Display is performed automatically once the pages are loaded, by parsing the semantic tags/classes/attributes
  contained in the page
  . These can be about places, people, time, etc.
* **Contextual** : Display rendering not only takes into account the semantic tags/classes/attributes,
  but also the ways they are assembled. For example a month tag can be resolved as in the context of a previous year
  tag.

RR0 has been designed in different ways over the years:

1. a vanilla JS app (parsing tags and updating the client HTML)
2. an [AngularJS](https://angularjs.org/) app with RR0-specific directives.
3. Static Site Generated (SSG) pages with a bit of client-side code, using the [ssg-api](https://www.npmjs.com/package/ssg-api).

So today the design is basically about converting page templates to final HTML, including a bit of client-side JS when interactivity is supported.

### Steps

The SSG steps to build RR0 are (in order):

1. the include step, which replaces all includes (header and footer, notably) by their contents;
1. the directory steps which generate directory pages:
    1. UFO cases
    1. People (by occupation, typically)
1. the content step, which replaces tags in the pages contents;
1. Books directory
1. Rebuild of the search index
1. Rebuild of the sources index
1. the copy step, which copies resources files (CSS, etc.)

#### Content step replacers

During website generation, a number of tags are replaced by specific HTML:

##### time

This is an override of the standard `<time>` HTML5 tag that aims to automate the rendering of a full human-readable
date (including day of week) or duration.

For both, a slash `/` can be used to express intervals (starting and end date, minimum and maximum duration,
respectively, as stated in the [ISO_8601 standard](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals).

###### Dates

By default, rendered dates add a `checkedLink` towards a possible page documenting this date (all examples below using a
french locale):

`<time>1952</time>` renders as `<a href="/time/1/9/5/2/">1952</a>`.

`<time datetime="">1952-07</time>` renders as `<a href="/time/1/9/5/2/07" title="Juillet 1952">Juillet 1952</a>`.

`<time datetime="1952-07-01"></time>` renders
as `<a href="/time/1/9/5/2/07/01" title="Mardi 1er Juillet 1952">Mardi 1er Juillet 1952</a>`.

`<time datetime="1952-07-01/03"></time>` will render `Mardi 1er au Jeudi 3 Juillet 1952`.

Once a date as been rendered, it sets the new new current/contextual time. All next times will be interpreted relatively
to
this new time. For example :

`<time datetime="1952-07-02"></time>` will render `la veille`.

`<time datetime="1952-07-04"></time>` will render `le lendemain`.

`<time datetime="1952-07-05"></time>` will render `le surlendemain`.

`<time datetime="1952-07-07"></time>` will render `le Mardi suivant`.

`<time datetime="05"></time>` will be rendered as `Samedi 5 Juillet 1952`, if stated after the latest date above.

###### Durations ####

According to the HTML5 specification, Durations can be expressed in the datetime attribute if starting with a `P`.

`<time datetime="P1D"></time>` renders as `<time datetime="P2D" class="duration">1 jour</time>`.

`<time datetime="P15M"></time>` renders as `<time datetime="P15M" class="duration">15 minutes</time>`.

`<time datetime="P20S"></time>` renders as `<time datetime="P20S" class="duration">20 secondes</time>`.

`<time datetime="P1D15M20S"></time>` renders
as `<time datetime="P15M20S" class="duration">1 jour, 15 minutes et 20 secondes</time>`.

`<time datetime="P30S/1M"></time>` renders as `<time datetime="P30S/1M" class="duration">30 secondes à 1 minute</time>`.

`<time datetime="P2H/3H"></time>` renders as `<time datetime="P2H/3H" class="duration">2 à 3 heures</time>`.

##### place

This is a class-restricted directive that aims to provide additional information on a given place.

###### Examples ####

`<span class="place">Hasselbach (Allemagne)</time>`

will render as

`<span class="place" id="place1" title="Cliquez pour voir la carte" style="cursor: pointer;">Hasselbach
(Allemagne)</span>`.

A click on the rendered element will trigger the display of a Google Map zoomed on the relevant place
latitude/longitude (as geocoded by
the Google Geocoding API).

#### people

This is a class-restricted directive that aims to provide a link to a people's bio.

##### Examples

`<span class="people">Claude Poher</time>`

will render as:

`<a href="/people/p/PoherClaude" translate="no">Poher</a>`.

Any text equal to the rendered last name further in the page will be automatically rendered the same. So only tagging is
required
only once to handle multiple mentions of the same person.

Also, as names can be expressed in multiple ways, the following patterns are also recognized:

`<span class="people">Poher, Claude</time>`

`<span class="people" title="Claude Poher">Poher</time>`

Note that when more than two words are used to express a people's name, only the latter one will be assumed to be the
last name.
For example :
`<span class="people">Carl Gustav Jung</time>`

will render as:

`<a href="/people/p/JungCarlGustav" translate="no">Carl Gustav Jung</a>`.

In case the last name contain multiple words, just write it in camel case, like below:

`<span class="people">Werner VonBraun</time>`

#### section

##### Contextual effects

* Adds a hierarchical entry (depending on the depth of the section, possibly in other sections) in the 'Contents'
  contextual menu.

## Implementation

Below is a description of the directory structure.

- [`.github`](.github) GitHub-related files such as sponsoring config. Maybe GiHub actions in the future.
- [`.idea`](.idea) Configuration of the [WebStorm IDE](https://jetbrains.com/webstorm) used to edit `.html`, `.css` and `.js`/`.ts` files.
- [`.netlify`](.netlify) Cache dir used by the [Netlify](https://netlify.com) [deploy tool](https://docs.netlify.com/cli/get-started/), which allows to deploy the website where it is hosted and served publicly.
- [`blog`](blog) Directory to host future blog posts, migrated from medium in the future.
- [`book`](book/README.md) Book directory and import facilities
- [`croyance`](croyance) Belief-related pages, including religion, conspiracy theories and other superstitions.
- [`Documents`](Documents) Legacy directory that used to contain various documents (articles, books) , which are now progressively migrated toward their own directories.
- [`droit`](droit) Legal-related pages, mostly about freelancing and entrepreneurship.
- `extension` Code for the RR0 [browser extension](https://medium.com/@javarome/implementation-web-browser-extension-9fccce983dea), with flavors for Safari (through an iOS app), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/rr0/) and Chrome.)
- [`images`](images) A legacy directory that used to contain all images, which are now progressively migrated toward their own topic directories.
- [`index`](index) Runtime `.js` code to enrich experience in pages containing indexed items (such as religious texts).
- [`lang`](lang) Runtime `.js` code and language selection form to enrich experience in pages allowing live language switch and vocal synthesis (such as religious text). Also, the root of pages about spoken languages in general.
- `node_modules` The set of installed Node dependencies, generated during setup's `npm install`
- [`note`](note) Styling of inline page notes.
- [`org`](org) The root directory for pages describing human organizations, from countries down to companies.
- `out` The built website output to be published, generated when running `npm run build`.
- [`people`](people) The root directory for pages about people, indexed by the first letter of the last name.
- [`place`](place) The root directory for pages about geographical places. Not to be confused with organizations (Italy is considered a human organization, not a geographical place).
- [`politique`](politique) The root directory for pages about politics and politicians. Related people still belong to the [`people/`](people) dir however, since people can have multiple occupations.
- [`public`](public) A directory where the [ViteJS](https://vite.dev) build tool reads everything that must be accessible as raw files when deployed.
- [`science`](science) The root directory for pages about both established and controversial "sciences", from physics to ufology. Also contains case studies for each one of them, so includes the studies for several ufological case for instance.
- [`search`](search) Runtime code for the form and `.js` component (reused in the browser extension) allowing to search among pages. The pages are stored into an `index.json` file which is generated at website build time if the `reindex` option includes `search` (see [`build.json`](build.json)).
- [`source`](source/README.md) Style to render inline sources in pages. Some sources info can be stored into an `index.json` file (to avoid fetching them at every build) which is generated at website build time if the `reindex` option includes `sources` (see [`build.json`](build.json)).
- [`tech`](tech) The root directory for pages about both technology, from airlanes to computer science.
- [`test`](test) Utility class to run RRO's unit tests.
- [`time`](time) The root directory for pages relating a global chronology of facts. Indexed by year digit. All other pages reference such time pages when mentioning dates.
- [`udb`](udb) A web interface to access the [udb database](https://github.com/RR0/uDb). Has its own package/build script.
- [`.editorconfig`](.editorconfig) Code editing settings.
- [`.eslintrc`](.eslintrc) Code convention settings
- [`.gitignore`](.gitignore) Files that must not be versioned in the Git repository.
- [`.htaccess`](.htaccess) The legacy rules for redirecting legacy URLs to new ones. The RR0 build should read it and convert it into a `netlify.toml` configuration file now.
- [`.nvmrc`](.nvmrc) The Node version requirement. Allows to select it automatically when command lines open into this directory.
- [`404.html`](404.html) The page to be displayed when a RR0 URL is not matching any existing page.
- [`apple-touch-icon`](apple-touch-icon.png) RR0 Logo, used by search result page and page tabs icons.

### Setup

1. Make sure [NodeJS](https://nodejs.org) 18+ is installed
1. Install NodeJS packages required by this project: `npm install`

### Directory structure

- `time/` hosts chronological data. Chronology is the base data of other data (for instance, a UFO case photograph will
  be hosted in its relevant time directory, and the case file will link to it).
  The subdirectories represent date components in the form `Y/Y/Y/Y/MM/DD/`
- `croyance/` hosts beliefs data, that is, opinions that do not rely on proof.
  This includes religion, conspirationism, occultism and other cults.
- [`org/`](org/README.md) hosts data about all kinds of human organizations, from countries to towns, including state agencies,
  universities, etc.
- `org/` hosts data about people, regardless of their nationalities, occupations, etc.

## Deployment

### Build

RR0.org is built through a Static Site Generation (SSG) using the [ssg-api](https://www.npmjs.com/package/ssg-api). To
run it:

1. Make sure you have a Google Maps embed API keys and set its value to the `GOOGLE_MAPS_API_KEY` env var.
1. Build the website using  `npm run build --reindex true`. This will generate the website in the `out` subdirectory, including a refreshed index of pages to be used in the search form.

### Publish

1. Make sure the netlify CLI is installed: `npm install netlify-cli -g`
1. Login in your netlify account: `netlify login`. This will ask you to authorize the CLI to access your Netlify
   account.
1. Link your current project dir to the relevant Netlify website: `netlify link`.
1. Publish the generated website: `netlify deploy --prod`

## Test

### Unit tests

- To run all tests: `npm run test`
- To run/debug a single test: specify its file name in the `test-one` script in `package.json`, then
  run/debug `npm run test-one`.
