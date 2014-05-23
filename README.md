RR0
===

RR0 is a client-side library that aims to ease the display of testimonial data.
It is instantiated as the http://rr0.org website, which hosts various data about unexplained phenomena.

It relies on AngularJS

General principles
------------------
 * **Data-centric** : The pages are the data. They contain semantic only, not how to display them.
 Display is implemented in ''directives'', using HTML templates and styling (CSS).
 * **Contextual** : Directives should render data as it is refined by its context. For example a month should be resolved as the month of a
specific year if a year has been found before.

Modules
-------
The 'rr0' app depends on the following modules:

 * [common](common.md)
 * [lang](lang.md)
 * [nav](nav.md)
 * [place](place/place.md)
 * [time](time/time.md)
 * [people](people/people.md)
 * [foot](foot.md)
 * [notes](notes.md)
 * [units](units.md)
 * [net](net.md)

Services
--------
### checkedLink ###
Returns a link towards a page, but only if this page exists.

Directives
----------
### time ###
This is an override of the standard `<time>` HTML5 tag that aims to automate rendering of a full human-readable date,
 including day of week.

 By default, such rendered dates add a `checkedLink` towards a possible page documenting this date.

#### Examples ####
 `<time datetime="1952"></time>` will render as `<a href="/time/1/9/5/2/" title=" 1952">1952</a>`.

 `<time datetime="07"></time>` will render `Mardi 1er Juillet 1952` with a french locale.

 `<time datetime="08-"></time>` will render `Mardi 1er Juillet 1952` with a french locale.

 `<time datetime="1952-07-01"></time>` will render `Mardi 1er Juillet 1952` with a french locale.

#### Contextual effects ####
 * Sets the new current/contextual time. All next times will be interpreted relatively to this new time.

### place ###
This is a class-restricted directive that aims to provide additional information on a given place.
#### Examples ####
 `<span class="place">Hasselbach (Allemagne)</time>`

 will render as

   `<span class="place" id="place1" title="Cliquez pour voir la carte" style="cursor: pointer;">Hasselbach
  (Allemagne)</span>`.

A click on the rendered element will trigger the display of a Google Map zoomed on the relevant place latitude/longitude (as geocoded by
the Google Geocoding API).

### people ###
This is a class-restricted directive that aims to provide a link to a people's bio.
#### Examples ####

 `<span class="people">Claude Poher</time>`

 will render as:

   `<a href="/people/p/PoherClaude" translate="no">Poher</a>`.

Any text equal to the rendered last name further in the page will be automatically rendered the same. So only tagging is required 
only once to handle multiple mentions of the same person.

Also, as names can be expressed in multiple ways, the following patterns are also recognized:

 `<span class="people">Poher, Claude</time>`
 
 `<span class="people" title="Claude Poher">Poher</time>`

Note that when more than two words are used to express a people's name, only the latter one will be assumed to be the last name. 
For example :
 `<span class="people">Carl Gustav Jung</time>`

 will render as:

   `<a href="/people/p/JungCarlGustav" translate="no">Carl Gustav Jung</a>`.

In case the last name contain multiple words, just write it in camel case, like below:

 `<span class="people">Werner VonBraun</time>`

### section ###
#### Contextual effects ####
 * Adds a hierarchical entry (depending on the depth of the section, possibly in other sections) in the 'Contents' contextual menu.

To do
-----
 * directives to handle measurements (lengths, weights, speed)
 * User settings to customize rendering of directives (i18n, how to display people names, which units to use for expressing measurements)