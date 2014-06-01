RR0
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

## Content ##

### time ###

This directive overrides the standard `<time>` HTML5 tag that aims to automate the rendering of a full human-readable date 
(including day of week) or duration.

For both, a slash `/` can be used to express intervals (starting and end date, minimum and maximum duration, respectively).

#### Dates ####

 By default, rendered dates add a `checkedLink` towards a possible page documenting this date (all examples below using a french locale):

 `<time datetime="1952"></time>` renders as `<a href="/time/1/9/5/2/" title="1952">1952</a>`.

 `<time datetime="1952-07"></time>` renders as `<a href="/time/1/9/5/2/07" title="Juillet 1952">Juillet 1952</a>`.

 `<time datetime="1952-07-01"></time>` renders as `<a href="/time/1/9/5/2/07/01" title="Mardi 1er Juillet 1952">Mardi 1er Juillet 1952</a>`.

 `<time datetime="1952-07-01/03"></time>` will render `Mardi 1er au Jeudi 3 Juillet 1952`.

Once a date as been rendered, it sets the new new current/contextual time. All next times will be interpreted relatively to 
this new time. For example :

 `<time datetime="1952-07-02"></time>` will render `<a href="/time/1/9/5/2/07/02" title="Mercredi 2 Juillet 1952">la veille</a>`.
 
 `<time datetime="1952-07-04"></time>` will render `<a href="/time/1/9/5/2/07/04" title="Vendredi 4 Juillet 1952">le lendemain</a>`.
 
 `<time datetime="1952-07-05"></time>` will render `<a href="/time/1/9/5/2/07/05" title="Samedi 5 Juillet 1952">le surlendemain</a>`.

 `<time datetime="1952-07-07"></time>` will render `<a href="/time/1/9/5/2/07/07" title="Mardi 7 Juillet 1952">le Mardi suivant</a>`.

 `<time datetime="05"></time>` will be rendered as `<a href="/time/1/9/5/2/07/05" title="Samedi 5 Juillet 1952">Samedi 5 Juillet 
 1952</a>`, if stated after the latest date above (which implicitly set context to July 1952).

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

   `<a href="/people/p/PoherClaude" translate="no">Claude Poher</a>`.

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

## Meta and heading ##

### Metadata ###

This directive overrides the standard `<meta>` tag with support for the following properties :

#### author ####

 `<meta name="author" content="Jérôme Beau">` will identify the content as some people name (see people directive above for supported 
 format) and display a link in the document toward the identified people, followed by the contextual date, if it can be resolved (from the URL scheme or another
 context). The only rendering difference is that authors are always displayed in the "LastName, FirstName" format.

In case of multiple authors, just repeat such meta author tag multiple times, and additional authors' names will be appended, 
separated by "&". For example :

 `<meta name="author" content="Baure, Jean-Francois">`
 `<meta name="author" content="David Clarke">`

will render :

 `<div class="author>`
 `  <a href="/people/b/BaureJeanFrancois">Baure, Jean-Francois</a> &amp; <a href="/people/c/ClarkeDavid" class="ng-binding">Clarke, 
 David</a>: Février <a href="/time/2/0/0/8/02">2008</a>`
`</div>`

if stated in a document under the `"/time/2/0/0/8/02"` URL.

#### copyright ####

 `<meta name="copyright" content="Paratopia n° 51, p. 225-228">` will identify the document as from the mentioned content as a source, 
 which will be appended in the author credit.

#### url ####

 `<meta url="copyright" content="http://example.com/originalDoc.html">` will identify the document as a copy or translation of the 
 mentioned URL, which can be followed to get the original document.

### Links ###

This directive overrides the standard `<link>` tag with support for the following relationship (`rel`) types :

#### start ####

 `<link rel="start" href="../../index.html" title="A big document">` will set the navigation "start" menu choice to display the mentioned 
 `title` with the mentioned `href` as an hyperlink.

#### prev ####

 `<link rel="prev" href=".." title="Previous chapter">` will set the navigation "previous" menu choice to display the 
 mentioned `title` with the mentioned `href` as an hyperlink.

#### next ####

 `<link rel="next" href="../next/" title="Next chapter">` will set the navigation "next" menu choice to display the 
 mentioned `title` with the mentioned `href` as an hyperlink.

To do
-----
 * directives to handle measurements (lengths, weights, speed)
 * User settings to customize rendering of directives (i18n, how to display people names, which units to use for expressing measurements)