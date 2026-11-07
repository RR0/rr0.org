---
title: "Database: from text to structure"
subtitle: "Enriching instead of replacing"
date: 2024-09-25
lang: en
url: https://rr0.medium.com/database-from-text-to-structure-9accb048c0bd
tags: [flexibility, website, relational-databases, data-structures, json]
---

# Database: from text to structure

*Enriching instead of replacing*

Most UFO databases use structured storage systems, whereas it is a [relational database](https://en.wikipedia.org/wiki/Relational_database), an Excel file or any other [DSV](https://en.wikipedia.org/wiki/Delimiter-separated_values) format. Such systems allow to easily define a **common structure for all data**, so that it becomes easy to process them uniformly: adding/updating a record is adding/updating a row of values, even if some row columns are not filled.

![An example of static data structure to hold all kind of data, but leading to a lot of unused space. This is usually mitigated using multiple arrays (one per data type)](https://cdn-images-1.medium.com/max/1024/1*PcUdW-aO9OkWjXMdVjjtvw.png)
*An example of static data structure to hold all kind of data, but leading to a lot of unused space. This is usually mitigated using multiple arrays (one per data type)*

![Even specialized (here: people) mitigates but does not solve the empty space problem.](https://cdn-images-1.medium.com/max/1024/1*mFbiugW_XjCV-Wo6-EgewA.png)
*Even specialized (here: people) mitigates but does not solve the empty space problem.*

It’s also well suited for computing statistics, as this sums up as an array, a table of values.

## Data first

[RR0](https://rr0.org/) didn’t use any such “static” data structure from the beginning, in order to:

- **avoid loosing data** which was too diverse, too varying to match a fixed data structure. Adapting data to it would lead to too much simplification and destruction.
- **render article pages** in a complex way (pictures, links, headings, footnotes, sources, etc.). It’s difficult to tell a story from data encoding. Rich text in web pages would better fit that goal.

## Structure second

That flexibility comes with a price, though: not using data structures prevented features to be been implemented (before AI takes over, at least). Such features would be:

- **Directory listing**: whether it is about sources, people or UFO cases, you need to encode those data if you want to filter them by name, country or occupation. Same for cases classification (DD, RV, CE…) or conclusion (remaining unidentified or hoax or misinterpretation).

![People search can even be restricted to occupations like pilots, witnesses, astronomers, etc.](https://cdn-images-1.medium.com/max/1024/1*m8FEQaHih6MHJR1dhFw83A.png)
*[People search](https://rr0.org/people/) can even be restricted to occupations like [pilots](https://rr0.org/people/pilotes.html), [witnesses](https://rr0.org/people/witness/index.html), [astronomers](https://rr0.org/people/astronomes.html), etc.*

- **Search among pages**: even if Internet search engines reference your pages, a local pages search is a must-have feature to allow your users to find all your data that matches their interest. This implies indexing all your pages, so they can be searched by title, contents, etc.

![Pages search](https://cdn-images-1.medium.com/max/604/1*OjP2fOIdcSrxTZbx1UqDlg.png)
*Pages search*

- **Datasource import**: if you want to fetch external sources and merge their data with yours, you have to provide a in-house data model to match with.

Since then, these features have been added in RR0: you can list/search for [people](https://rr0.org/people/) or [UFO cases](https://rr0.org/science/crypto/ufo/enquete/dossier/), and you can search for pages titles. You can also apply some basic filters on name, country, occupation, etc.

But did this imply the aforementioned data destruction?

### Adding

No, it didn’t. Structured data was *added* to RR0, aside of the existing web pages.

Also, the format of this structure was selected to be convenient: [JSON](https://en.wikipedia.org/wiki/JSON) is a kind of **semi-structured** format, conforming to a flexible, possibly dynamic schema. For instance, Adamski’s data would contain:

```
{  "type": "people",  "occupations": ["contactee", "farmer"],  "countries": ["pl", "us"],  "birthTime": "1891-04-17",  "birthPlace": "Bydgoszcz (Poland)",  "deathTime": "1965-04-23",  "deathPlace": "Silver Springs (Maryland)"}
```

Those data allow to search people by occupation, country, etc. This also allows (depending on your JSON schema or the lack of it) to **omit** data when it’s not available, thus solving the unused space problem:

```
{  "type": "people",  "occupations": ["physician"],  "countries": ["us"],  "birthTime": "1940"}
```

![Using a JSON Schema, values of fields can be checked and editing tools can provide completion hints](https://cdn-images-1.medium.com/max/384/1*ne1cEZYZ6AOGm-AzyadESA.png)
*Using a JSON Schema, values of fields can be checked and editing tools can provide completion hints*

### Single source of truth

However, some of the structured data listed above (such as birth dates, names, etc.) were already written in the relevant web page. Thus, a *duplication *occurs when doing so, leading to the risk of out-of-sync data (like, the JSON file holds a different data value than the web page, or *vice versa*) and bigger storage requirements, anecdotally.

To avoid that risk, redundant data have to be *generated* from unique reference data. This is now how *parts* of RR0 web pages are generated from those JSON files, like name, birth/death dates, and so on.

![The Adamski web page, mixing generated (underlined in red) and edited parts.](https://cdn-images-1.medium.com/max/1024/1*0sLZlhbA9g-oHot3-ksKcw.png)
*The Adamski web page, mixing generated (underlined in red) and edited parts.*

## Conclusion

Moving part of the unstructured data to JSON structures:

- provides **flexibility**, notably to allow missing data;
- allows to provide **new features** (directory listing, search);
- allows to **generate textual data**.

However the JSON schema stills seems too rigid. The next step will be to make this flexible data even more flexible by generalizing it.
