RR0  [![Build Status](https://travis-ci.org/RR0/RR0.svg?branch=master)](https://travis-ci.org/RR0/RR0)
===

RR0 is a client-side library that aims to ease the display of testimonial data.
It is instantiated as the http://rr0.org website, which hosts various data about unexplained phenomena.

It relies on AngularJS

General principles
------------------
 * **Data-centric** : The pages are the data. They contain semantic only, not how to display them.
 Display is performed automatically once the pages are loaded, by parsing the semantic tags/classes/attributes contained in the page
 . These can be about places, people, time, etc.
 * **Contextual** : Display rendering not only takes into account the semantic tags/classes/attributes, 
 but also the ways they are assembled. For example a month tag can be resolved as in the context of a previous year tag.

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

### toLink (l, [text1, text2]) ###
Register texts as to be automatically linked to l.

### nounsToLink (l, [text1, text2]) ###
Register nouns as to be automatically linked to l. 
That means that the plural of the nouns will be linked as well.

Directives
----------

### time ###

This is an override of the standard `<time>` HTML5 tag that aims to automate the rendering of a full human-readable date (including day 
of week) or duration.

For both, a slash `/` can be used to express intervals (starting and end date, minimum and maximum duration, respectively, as stated in the [ISO_8601 standard](http://en.wikipedia.org/wiki/ISO_8601#Time_intervals).

#### Dates ####

 By default, rendered dates add a `checkedLink` towards a possible page documenting this date (all examples below using a french locale):

 `<time datetime="1952"></time>` renders as `<a href="/time/1/9/5/2/" title="1952">1952</a>`.

 `<time datetime="1952-07"></time>` renders as `<a href="/time/1/9/5/2/07" title="Juillet 1952">Juillet 1952</a>`.

 `<time datetime="1952-07-01"></time>` renders as `<a href="/time/1/9/5/2/07/01" title="Mardi 1er Juillet 1952">Mardi 1er Juillet 1952</a>`.

 `<time datetime="1952-07-01/03"></time>` will render `Mardi 1er au Jeudi 3 Juillet 1952`.

Once a date as been rendered, it sets the new new current/contextual time. All next times will be interpreted relatively to 
this new time. For example :

 `<time datetime="1952-07-02"></time>` will render `la veille`.
 
 `<time datetime="1952-07-04"></time>` will render `le lendemain`.
 
 `<time datetime="1952-07-05"></time>` will render `le surlendemain`.

 `<time datetime="1952-07-07"></time>` will render `le Mardi suivant`.

 `<time datetime="05"></time>` will be rendered as `Samedi 5 Juillet 1952`, if stated after the latest date above.

#### Durations ####

According to the HTML5 specification, Durations can be expressed in the datetime attribute if starting with a `P`.

 `<time datetime="P1D"></time>` renders as `<time datetime="P2D" class="duration">1 jour</time>`.
 
 `<time datetime="P15M"></time>` renders as `<time datetime="P15M" class="duration">15 minutes</time>`.
 
 `<time datetime="P20S"></time>` renders as `<time datetime="P20S" class="duration">20 secondes</time>`.

 `<time datetime="P1D15M20S"></time>` renders as `<time datetime="P15M20S" class="duration">1 jour, 15 minutes et 20 secondes</time>`.
 
 `<time datetime="P30S/1M"></time>` renders as `<time datetime="P30S/1M" class="duration">30 secondes à 1 minute</time>`.

 `<time datetime="P2H/3H"></time>` renders as `<time datetime="P2H/3H" class="duration">2 à 3 heures</time>`.

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