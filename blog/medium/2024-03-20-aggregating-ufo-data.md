---
title: "Mapping UFO data"
subtitle: "A challenge of heterogeneity"
date: 2024-03-20
lang: en
url: https://rr0.medium.com/aggregating-ufo-data-1fece059fcb0
tags: [software, heterogeneity, database, ufo, standardization]
---

# Mapping UFO data

*A challenge of heterogeneity*

For 25+ years now, I’ve been maintaining the [RR0](https://rr0.org) website, which specializes in UFO data. This includes thousands of “UFO cases” but, like for any butterfly collection, that’s never enough.

When you’re permanently in search of new UFO data, you end up thinking of aggregating other databases. Following the vision of the [Archipelago project](https://github.com/RR0/Archipelago), this is something that was implemented as [part of RR0](https://github.com/RR0/rr0.org/tree/master/time/datasource).

![A poster describing the mapping approach by the author at GEIPAN’s CAIPAN 2 workshop on October 22th, 2022](https://cdn-images-1.medium.com/max/1024/1*c0xgLC0Kk2lqlQ3xmNvcfA.png)
*A poster describing the mapping approach by the author at [GEIPAN’s CAIPAN 2 workshop](https://www.cnes-geipan.fr/fr/node/59754) on October 22th, 2022*

This article describes the challenges faced in such an endeavour, and draws some recommendations for both implementing it and for authors of databases.

## The plan

In a simplistic way, aggregating is “only” a matter of **fetching** data, then **merging** it in your database.

However, the main problem here is that the fetched data has a structure that is different from the one used in your database. So an intermediary step must be to **map** that fetched data to your target data model.

We’ll discuss each of those steps below.

## Fetching

### Policy

A first question before implementing data fetching from other databases is your right to do so. A number of databases are publicly accessible and some even feature “export” capabilities, thus granting you implicitly the right to use their data, but that** doesn’t mean you’re allowed to re-publish** them or, even if so, under which circumstances (such quoting the source, typically).

While it is always better to ask the database author before attempting any publication, there is a use case where you are allowed to publish data from others: **quotation**, a.k.a. “[fair use](https://en.wikipedia.org/wiki/Fair_use#Internet_publication)”. In the case of UFO data, this could be a quick summary of the case, along with a **link** toward the original source. This is what was implemented in RR0.

### Technical heterogeneity

Even before the “business” heterogeneity due to the differences of structure in the databases to merge, the sole task of data fetching can face technical differences, in:

- **media**: you may fetch data from a local file (a UDB data file, GEIPAN or Base Ovni France exports, for instance) or some online fetch request ([API call](https://en.wikipedia.org/wiki/API#Remote_APIs), [web scrapping](https://en.wikipedia.org/wiki/Web_scraping)). In that later case you may need to simulate several web browsers (through different User-Agent HTTP header), to avoid being blacklisted as an abusive sucking bot;
- **format**: you may fetch a web page (check the Content-Type headers from HTTP responses or HTML <meta> directives), an Excel/CSV file, a proprietary format like the [UDB](https://github.com/RR0/uDb) one, etc. and each of them can use different character encodings (like [UTF-8](https://en.wikipedia.org/wiki/UTF-8) or [ISO-8859–1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1)).

At the end of the day, a UFO cases datasource can be described as something that provides fetched data given some search criteria (a time frame and possibly a location, typically).

```
/**
 * A source for cases.
 *
 * @param S The source case type.
 */
interface CaseSource<S> {
  /**
   * The datasource authors to mention as a source.
   */
  authors: string[]

  /**
   * The datasource name to mention as a source.
   */
  copyright: string

  /**
   * Get cases matching a context, in the datasource native format.
   *
   * @param context
   */
  fetch (context: RR0SsgContext): Promise<S[]>
}
```

For instance:

```
class FuforaDatasource implements CaseSource<FuforaCaseSummary> {
  readonly authors = ["FUFORA"]
  readonly copyright = "Observational database"

  async fetch(context: RR0SsgContext): Promise<FuforaCaseSummary[]> {
    // Issue a web request to gather the cases matching the context
  }
}
```

And you can then use it like:

```
context = new RR0SsgContext()
context.time.setYear(1970)
context.time.setMonth(11)

datasource = new FuforaDatasource()

fuforaCasesForNovember1970 = await datasource.fetch(context)
```

### Fetch time

Great. Now that you can fetch the data you want, when should you do that? This could be:

- **dynamically**, when the user browse it. This allows an aggregation that is always up-to-date, but has a number of drawbacks, among which a slow user experience (accounting for the fetch time of all aggregated sources) and an unreasonable request load on external servers whereas most users don’t care about such an evergreen aggregation.
- at **build time**, each time you publish a new version of your database;
- **planned**, when you decide that a it’s worth gathering the latest updates of external sources. This can be punctually or a some regular interval (every month or whatever). However, since you may want to update your database without re-fetching external data, you would need to *store* fetched data (if allowed by the database license) as a local backup to rebuild your database from at any time (thus reducing the query load of the remote servers).

RR0 currently uses the second option, and is switching to the last one. In either case, **you should always indicate the fetch time** in the displayed data, so that the user can assess data freshness. Sometimes this time mark is a field of the database and you can easily grab it. If not, the most reasonable option is probably to use the time you fetched the data.

## Mapping

This is the hardest part, because this is where you are going to handle all the inconsistencies:

- between the **external** model and your model, which is the primary goal;
- **internally**, among the data ofthe external model itself;
- **factually**, between the external data and reality (places, times, etc.)

So you have to implement a policy in such cases. Like, either:

- **fail **and display some error, thus being unable to integrate until the data is fixed by the database author.
- **ignore** the wrong data by skipping/not including it in your integration result. Better less data than no data.
- **include** wrong data “as is”. This is privileging quantity over quality.
- **fix** wrong data through various techniques (fuzzy matching, guessed corrections through AI or empirical rules as implemented in RR0).

So a case mapper could be defined as below:

```
/**
 * Maps a case type to another type.
 * 
 * @param C The context type to use.
 * @param S The source case type (FuforaCaseSummary for instance).
 * @param T The target case type (RR0CaseSummary for instance).
 */
interface CaseMapper<C, S, T> {
  /**
   * Transform a native case into a target format.
   *
   * @param context
   * @param sourceCase the native source case.
   * @param sourceTime The date of source case publication.
   * @return the case in normalized format
   */
  map(context: C, sourceCase: S, sourceTime: Date): T
}
```

For instance:

```
class FuforaCaseRR0Mapper 
implements CaseMapper<HtmlRR0SsgContext, FuforaCaseSummary, RR0CaseSummary> {

  map(context: HtmlRR0SsgContext, sourceCase: FuforaCaseSummary, sourceTime: Date): RR0CaseSummary {
    // Create a RR0CaseSummary from the FuforaCaseSummary
  }
}
```

And you can then use it like:

```
fuforaRR0Mapper = new FuforaCaseRR0Mapper()

rr0CasesForNovember1970 = fuforaCasesForNovember1970
  .map(fuforaCase => fuforaRR0Mapper.map(context, fuforaCase, fetchDate))
```

Note that a mapper can also be used to convert data to some storage format, like:

```
csvMapper = new CsvMapper()

csvLines = fuforaCasesForNovember1970
  .map(fuforaCase => csvMapper.map(context, fuforaCase, fetchDate))
```

In any case, each mapper implementation will have to handle the challenges described above. A more detailed list follows below.

### Language

This is the first issue you may face if you’re targeting worldwide databases: data may have been written using a spoken language that is different from the one of your target database:

- A **place** like New Mexico will be spelled Nouveau Mexique in french or Nuevo México in spanish, the french Normandie and Occitanie regions will be spelled Normandy and Occitania in english, Alger is spelled Algiers in english, etc. so names cannot always be matched “as is”: for instance, [Pielisjärvenkuntameans “Municipality of ](https://github.com/RR0/rr0.org/blob/master/org/eu/fi/FinlandMessages.ts#L11)[Pielisjärvi” in finnish](https://github.com/RR0/rr0.org/blob/master/org/eu/fi/FinlandMessages.ts#L11), and so you’ll have to devise that to match any finnish city name or render it in another language.
- A **date** like 11-31-1970 will be encoded as 31-11-1970 in french or 1970–11–31 in ISO format.
- Like said above, **characters encoding** may vary in order to support some languages specifics. For instance the [cedilla](https://en.wikipedia.org/wiki/Cedilla) of the “Briançon” city name might be encoded using the “ISO-8859–1” charset and you’ll have to detect + support that.

### Obsolete data

Cities and organizations names may change over time. Even locations can change sometimes. So you need to recognize old names and map them to current, normalized names.

![The locations of two cases in the FUFORA database which are different but actually reference the same “Lieska” city: "Pielisjärvenkunta” means “Municipality of Pielisjärvi” (which has since been renamed “Lieksa”), and “Pielisjärvi Lieksa" which states both the old and new names of the city.](https://cdn-images-1.medium.com/max/782/1*asFR2E7HZ9J4njHCcfzaOA.png)
*The locations of two cases in the [FUFORA database](https://www.fufora.fi/ufodb2/ufohaku.php?sid=) which are different but actually reference the same “Lieska” city: "Pielisjärvenkunta” means “Municipality of Pielisjärvi” (which has since been renamed “Lieksa”), and “Pielisjärvi Lieksa" which states both the old and new names of the city.*

### Data variants

Sometimes the same data will be encoded differently. For example a city might be named Sainte Marie, then Sainte-Marie or Ste Marie in other cases of other database, but even in the *same* database.

So, to avoid duplicates which may impair your statistics, you need to recognize similar data to merge them.

### Missing data

Never assume that a field will be filled. Dates or locations can be more or less known (only a vague region without any specific city for instance), and you may consequently encounter dates like 1972/08/--. Cases can be region- or even country-wide and not reference a specific city. Differences between countries can also imply that fields (like states or counties) just don’t make sense in some cases.

![A GEIPAN case with a missing month in the sighting date, but a different date in the case details.](https://cdn-images-1.medium.com/max/458/1*0a6fIVM8b7lRcWKjcmJtxQ.png)
*[A GEIPAN case](https://geipan.fr/fr/cas/1977-10-00438?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing) with a missing month in the sighting date, but a different date in the case details.*

![A NUFORC case which misses CITY and STATE data (because of different regional standards in UK)](https://cdn-images-1.medium.com/max/544/1*t3S9QGPMwPBouX_b9pZ5YQ.png)
*[A NUFORC case](https://nuforc.org/sighting/?id=172574) which misses CITY and STATE data (because of different regional standards in UK)*

### Incorrect data

Sometimes data will just be incorrect (a misspelled city name, a wrong region code for a city, a wrong date for a case, a wrong URL link, etc.)

![A GEIPAN case located in the “Indre” (36) french department whereas the village of Morlincourt in located in the “Oise” (60) departement, as stated in the case name.](https://cdn-images-1.medium.com/max/984/1*0voHbuV0bTu0xI51zFFYGg.png)
*A [GEIPAN case](https://geipan.fr/fr/cas/1960-08-09109?field_agregation_index_value=MORLINCOURT&field_date_d_observation_value%5Bmax%5D=&field_date_d_observation_value%5Bmin%5D=&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing) located in the “Indre” (36) french department whereas the village of Morlincourt in located in the “Oise” (60) departement, as stated in the case name.*

![A GEIPAN case that associates a incorrect number with the “Rhone” french department (“71” in the title instead of 69 in the data). The actual day in the data is the 19th of March, not the 18th. It also features a deprecated city name (since “Belleville-sur-Saône“ was renamed “Belleville” before being merged into the “Belleville-en-Beaujolais” municipality)](https://cdn-images-1.medium.com/max/976/1*uF7Y-mImTPh_aMttLVb93A.png)
*[A GEIPAN case](https://geipan.fr/fr/cas/1977-03-00399?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing) that associates a incorrect number with the “Rhone” french department (“71” in the title instead of 69 in the data). The actual day in the data is the 19th of March, not the 18th. It also features a deprecated city name (since “Belleville-sur-Saône“ was renamed “Belleville” before being merged into the “Belleville-en-Beaujolais” municipality)*

In this example, statistics about sighting locations would be impacted by such wrong values.

### Inconsistent data

Sometimes the rules supposed to be enforced by the database itself are not complied with.

![Some GEIPAN cases which use different prefixes (“DEP” and “DPT”) to denote that they are department-wide.](https://cdn-images-1.medium.com/max/1024/1*sRNHYTVpE9qVa5I0fE06YQ.png)
*Some GEIPAN cases which use different prefixes (“DEP” and “DPT”) to denote that they are department-wide.*

### Undocumented data

Sometimes you’ll find data encoded in a way that is not expected, because not documented.

![Some GEIPAN cases have a undocumented “computed classification” that does not fit the usual A,B,C,D1,D2 values.](https://cdn-images-1.medium.com/max/548/1*mDBxsDtVC_jxyPffmpwYaA.png)
*Some GEIPAN cases have a *undocumented* “computed classification” that does not fit the usual A,B,C,D1,D2 values.*

### Obscure data

Aside undocumented values, fields can sometime contain data which do not strictly comply with their expected type. A typical issue is when the sighting place is supposed to be stored in a “city” field. Such a field will quickly loose it’s strong typing when it will be about describing a case occurring *between* cities, in the wild, the middle or a road, some aerial altitude or on a ship at sea.

![A case location from a NUFORC “CITY” field that is in the wild.](https://cdn-images-1.medium.com/max/1024/1*d9ZKC28d4PzJUgiY8vvIzw.png)
*[A case](https://nuforc.org/sighting/?id=42871) location from a NUFORC “CITY” field that is in the wild.*

![A case location from a NUFORC “CITY” field that is a road.](https://cdn-images-1.medium.com/max/696/1*SwlyIpdCbbZjxdaN_CoqTQ.png)
*[A case](https://nuforc.org/sighting/?id=2215) location from a NUFORC “CITY” field that is a road.*

![NUFORC cases featuring fancy CITY values, missing states and fuzzy COUNTRY.](https://cdn-images-1.medium.com/max/1024/1*F-vaTOF0RASxz_QIIBw2Uw.png)
*[NUFORC cases](https://nuforc.org/subndx/?id=e197706) featuring fancy CITY values, missing states and fuzzy COUNTRY.*

![A GEIPAN case which is did *not* occurred at a place named “CASSIS-CARNOUX”, but *between* the cities of Cassis and Carnoux-en-Provence. The only way to guess is to 1) fail looking up such a city name, then 2) attempt to interpret it as a two cities expression.](https://cdn-images-1.medium.com/max/1024/1*upCJnbmPCv6rY979jYVQcw.png)
*A [GEIPAN case](https://geipan.fr/fr/cas/1976-11-00358?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1976%2F11%2F04&field_date_d_observation_value%5Bmin%5D=1976%2F11%2F04&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing) which is did *not* occurred at a place named “CASSIS-CARNOUX”, but **between** the cities of Cassis and Carnoux-en-Provence. The only way to guess is to 1) fail looking up such a city name, then 2) attempt to interpret it as a two cities expression.*

### Redundant data

Sometimes data will be repeated in multiple fields. Not a big deal may you say… unless you implementation does not support a country name in a city field (since an existing country field was supposed to contain that).

![A NUFORC case where the CITY field contains the existing COUNTRY field](https://cdn-images-1.medium.com/max/566/1*AsYvmRQAqDuesiM3q3g8vw.png)
*[A NUFORC case](https://nuforc.org/sighting/?id=73853) where the CITY field contains the existing COUNTRY field*

## Merging

Now that you fetched the data and mapped it to your database model, you’re able to compare those mapped cases to yours. Then either they are:

- **not duplicates**: just **add** them to your data.
- **duplicates**: either **omit** the duplicate data or try to **merge** its details with the details you own.

In any case, you’ll have to make sure to:

- **put the data where it belongs**. For instance, maybe you have a dedicated page or heading in a page for “March 1970, or is it just a row in a CSV file?
- **keep it well sorted**: new data should not just be appended but inserted at the right place (keeping a consistent chronological order, typically).

### Detecting duplicates

It is not likely that your data about a given case and the relevant data from an external database, even mapped to your structure, will be *exactly* the same (not speaking about data in different languages).

However, a good criteria for matching is a similarly in time and location. To match them, make sure to compare them only after:

- **normalizing spaces** (including tabs and line feeds) as a given character (for instance always replace them with “-” dashes in city names). Also make sure to remove side spaces, before and after names.
- **removing case differences**: some names might be uppercase, others lowercase or with mixed case. So compare lowercase versions only, for instance.
- **removing accents**: some name may come with accents, while some others not or not everywhere, so it’s better to compare them without those subtleties.

### Merging duplicates

Once you have detected cases to merge, you have to decide what/how to merge. We already saw that the more reasonable policy for merging is just to “quote” an external case, but let’s have a look at what we could do and why it reinforces this reasonable choice:

- **time and location are already known **since they constituted your “key” to match the cases. Maybe some subtleties (hour and minutes of a date) could be added when missing, though.
- **description can hardly be merged** since it is a long, textual field. Even with sources in the same language, you would need AI to merge them, with unpredictable results. Obviously, it would be worse for texts in different languages, by adding unpredictable translations in the equations, especially in a specialized domain as ufology.
- **Sources could be merged** as they are quite naturally structured (with authors, title, publication date, editor, etc.) but they are unfortunately not so common in databases.
- **Other fields can hardly be merged** (i.e. fields which exist in the external data but not in yours) if they are not known in your data structure.

Anyways, the code to merge will be common for any database, since after mapping it became a matter of merging apples with apples, i.e. fetched+mapped target cases with existing target cases:

```
existingCases = this.rr0Datasource.fetch(context)
casesToAdd: RR0CaseSummary[] = []
for (const mapping of mappings) {
  datasource = mapping.datasource
  mapper = mapping.mapper
  sourceCases = await datasource.fetch(context)
  fetchTime = new Date()
  casesToMerge = sourceCases
    .map(sourceCase => mapper.map(context, sourceCase, fetchTime))
  toAddFromThisSource: RR0CaseSummary[] = []
  for (const caseToMerge of casesToMerge) {
    foundExisting = existingCases.find( 
      existingCase => existingCase.time.equals(caseToMerge.time) 
                   && existingCase.place?.name === caseToMerge.place?.name)
    if (foundExisting) {
      // Case is already known, either skip or merge it
    } else {
      casesToAdd.push(caseToMerge)
    }
  }
  casesToAdd.concat(toAddFromThisSource)
}
allCases = existingCases.concat(casesToAdd)
  .sort() // Keep the new cases list ordered
render(allCases)
```

## Conclusions

This article summarizes what has been learned from implementing the aggregation (fetching + mapping) of “quotes” of the following databases:

- [**Base OVNI France**](http://baseovnifrance.free.fr/): a french-speaking database about cases in France, allowing CSV exports of search results;
- [**FUFORA**](https://www.fufora.fi/ufodb2/): a finnish-speaking database about cases in Finland;
- [**GEIPAN**](https://geipan.fr/fr/recherche/cas#nolink): the official french-speaking database about cases in France, available online but also as a CSV export (but 3-years old already);
- [**NUFORC**](https://nuforc.org/databank/): an english-speaking database of worldwide case but focused on english-speaking countries (USA, UK, Canada, Australia, New Zealand);
- [**URECAT**](https://ufologie.patrickgross.org/ce3/): A bilingual (french+english) database specialized in CE3 cases.

![Aside “native” RR0 cases, a set of RR0 case summaries automatically integrated from the GEIPAN and Base OVNI France databases. They contain resolved times and locations, a summary of some case info (“with physical effect”, “probably identified”) and mentions the original cases as a source.](https://cdn-images-1.medium.com/max/1024/1*9KkyrKxEmGMLbdmvAjsr7Q.png)
*Aside “native” RR0 cases, a [set of RR0 case summaries](https://rr0.org/time/1/9/7/0/07/index.html) automatically integrated from the GEIPAN and Base OVNI France databases. They contain resolved times and locations, a summary of some case info (“with physical effect”, “probably identified”) and mentions the original cases as a source.*

### For database aggregators

Integrating external data means facing the challenge of uncontrolled data. This lack of control means differences with you, but also differences one with each other.

A significant part of those challenges stem from human mistakes when entering the data (duplicates, mistakes, missing data), which require significant database-specific error handling procedures.

The most reasonable option (for both ethical/legal and technical reasons) for integrating other databases seems to just “quote” them and reference the actual details in external links.

Going beyond this will require use of AI.

### For database authors

- **Assume n-ary values instead of unary**: an UFO can be sighted from multiple places, a place can have multiple names (even in the same language), witnesses can be multiples, UFOs themselves can be multiples, etc. A number of incorrect data come from allowing only one choice among many.
- **Store keys, not values**: To avoid to guess when different data actually reference the same values, just store unique identifiers for those values. For instance, latitude and longitude (+date/time) are enough to guess the relevant city/state/country, elevation and time zone. This doesn’t prevent your system to display the relevant clear place names when entering the data, and this will avoid entering different values for a same thing (and it will save your data space, as a side benefit). Even a case “title” should be generated from its data to avoid discrepancies.
- **Use standards**: UTF-8 characters encoding, ISO 8601 YYYY-MM-DD date format (time zone will be inferred from location), preferably ISO 8601–2 to include time approximations from [EDTF](https://www.loc.gov/standards/datetime/).
- **Time**: Support any missing value in year, month, date, hour, minutes (yes, year included, as somebody can remember a date in the year but remain unsure about the exact year). Support approximate flag for each of these. Support intervals (“between some time and another”) of all this. Of course always use proper timezone given location.
- **Places**: Don’t confuse them with organizations. Organizations can have one or multiple places. A city is an organisation. Strictly speaking, a location is strictly geographical (latitude, longitude) and elevation (which can be inferred from them) can be important to assess a sighting.
- **Organizations**: Don’t assume anything. No countries share the same administration levels (for instance, there might an intermediate level between region and city or not), but administration levels are not always consistent, even in the same country (like, a city can be in a county, but a county can also be in a city). Use a data structure than can vary, non only by country, but by administration instance in that country.
- **Publish a license** stating how your database can be reused: which data be re-published, how the source should be quoted, can the data be stored, how long, etc.

Reliability index is also something that is missing from most databases and for a reason: it’s very difficult to make it objective. One may think that an objective reliability can be elaborated from the gathered “facts” of the case, but this just depends on the facts gatherer. An **investigators database** should help classify the reliability of investigations.
