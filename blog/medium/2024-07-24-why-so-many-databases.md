---
title: "Why so many databases?"
subtitle: "Openness to boost adoption over reinvention"
date: 2024-07-24
lang: en
url: https://rr0.medium.com/why-so-many-databases-185b60a9cae7
tags: [ufo, database, reuse, reinvention]
---

# Why so many databases?

*Openness to boost adoption over reinvention*

![](https://cdn-images-1.medium.com/max/1024/1*ZWvV7Tke_9b-x9iXNnHafQ.jpeg)

There is [a page on RR0 listing a number of UFO cases catalogs](https://rr0.org/time/Catalogues.html). It sums up to 60 items, but it is *far* from being exhaustive. I discover multiple ones every year, either ancient, forgotten or unknown, or new and fresh.

A recent presentation of [CUCO](https://proyecto-cuco.blogspot.com/) (a merge of spanish, portuguese and Andorra databases, by Juan-Pablo González, Ignacio Cabria & al.) made me discover a new and huge (12155 cases) one. Well… not so new, since it has been maintained for 24 years!

CUCO made a number of good choices such as ensuring** traceability** (down to the merged sources) and **anonymity** of witnesses (by not merging personal data — even if this is a kind of data loss). As any merge of existing databases, it also struggled with [the usual issues of such an endeavour](https://medium.com/@rr0/aggregating-ufo-data-1fece059fcb0) such as **defining fields which are specific to a merged source** (thus leading to a lot of “empty” spaces where cases are not from this source) or **normalizing only a small subset of those fields** to be able to run statistics on them.

It also made a number of choices that most databases (including mine) do and that we should stop doing in order to **reduce the proliferation (and so dispersion) of heterogeneous UFO data**.

## Database-creation triggers

### Restricted scope

To screen what should be in your database, you have to define what is a “UFO case” and what is not. Because, of course, you have to stop collecting somewhere.

For instance, should a [bigfoot](https://rr0.org/science/crypto/zoo/enquete/dossier/Bigfoot) case be part of a UFO database? Probably not… but should it be if the catalog is a CE3 catalog? The answer becomes less obvious (for instance, a number of cases depict [“hairy” entities](https://rr0.org/science/crypto/ufo/analyse/hypotheses/intelligence/HET/pilosite/index.html) or you can find studies [asserting a correlation between UFO cases and bigfoot sightings](https://medium.com/@rr0/ufonomics-9601410244a8)). So maybe it makes sense to include sasquatchs or [chupacabras](https://rr0.org/science/crypto/zoo/enquete/dossier/Chupacabra/index.html) (sightings of which include correlated UFO observations) in a CE3 catalog. But if so, why not including them in a less-specific UFO database that would include such a [CE3 classification](https://rr0.org/science/crypto/ufo/observation/classification/hynek/rr/3/index.html) field?

Another example is the restriction of UFO cases as involving a flying object or some “extraterrestrial” qualification (by the witness, an investigator, a reporter)? Doing so would make sense given the definition of the acronym, but would remove a whole corpus of data leveraged by larger-scale [hypotheses](https://rr0.org/science/crypto/ufo/analyse/hypotheses/index.html) (like the “[paranormal](https://rr0.org/science/crypto/ufo/analyse/hypotheses/intelligence/HPN/)” ones). Even [Michel Monnerie](https://rr0.org/people/m/MonnerieMichel/), leader of the french movement of the skeptic “new ufology”, once believed that UFO traces could have been the result of [psychokinesis](https://rr0.org/science/crypto/ufo/analyse/hypotheses/intelligence/HPN/Psi/).

![](https://cdn-images-1.medium.com/max/450/1*sLMMnPidxBEkhf06V4jUeQ.png)

My point, here, is not to say that larger scopes are better because they include more explanations which some (including myself) may find “foolish”. It is to say that **the larger scope a database will have, the less people investigating other hypotheses will need to create another database.**

### Loss of information

Most databases use a structured approach which encodes values in fields/columns. They almost have no choice than doing so, because of the way search features are programmed as of today, using a combination of pattern matching (“equals”, “starts with”, “includes”…) and boolean (“and”, “or”, “not”…) operators.

This is about to come to an end, thanks to the rise of AI/[NLP](https://rr0.org/tech/info/soft/data/science/ml/nlp/index.html) capabilities which allow to extract *meaning* and so *characteristics* from complex texts and other media (images/video, sounds).

While waiting for this paradigm shift to complete, cases from most traditional databases are *reduced* as encodings of way more complex investigation files (including testimonials, drawings, etc.). This implies that database users may not find the fields they are looking for, as so **may be tempted to build a database that contain the data their needs,** so they can apply the computation they want on it.

Hopefully some databases (like [the one from GEIPAN](https://www.cnes-geipan.fr/fr/recherche/cas#nolink)) include both structured fields *and* the original case files, and I believe this is the way to go in the interim: **always provide raw data along with the structured data it was devised from**. Just like scientific papers should provide the raw data they used to peers who would like to review them.

![](https://cdn-images-1.medium.com/max/422/1*-KkImpsvbzGa46EFSJV1-w.png)

**The case for anonymity**

Anonymization is also obviously a kind of (constrained) data loss. In most cases this will have no or limited impact, if limited to witnesses names, but sometimes this goes beyond by obfuscating witnesses location and so usually the sighting location. Also sometimes the witness doesn’t want to reveal his/her occupation, even (and maybe especially) it may cast some light and/or credibility on the whole case. Furthermore, all this anonymization guard is expected to end after some time (like the 60 years of french [Gendarmerie](https://rr0.org/org/eu/fr/dn/gendarmerie/index.html) testimonial reports): it doesn’t make sense to keep century-old data anonymized, especially when it can help.

Mitigating this, however, is very hard: for recent cases, witness data should be both redacted and stored somewhere for future use. This would imply separate and encrypted databases related to such sensitive data, but I’m afraid the benefit will not be considered worth the effort 😢.

### Non-accessibility

Even after 24 years, CUCO is still not publicly available. It may be in the future, depending on the agreement of the owners of the original merged databases.

Such legal issues (third parties copyright, confidentiality, [defense secrecy](https://medium.com/@rr0/quand-le-conspirationnisme-met-en-danger-le-secret-d%C3%A9fense-2864be4e3d50)) are valid reasons for not publishing, but can be worked out, as redacted FOIA documents or anonymized national databases demonstrated. Rivalries between people and organizations, fear of being stolen/not being credited/retributed for the work are among the possible reasons for not publishing.

However, this has to be balanced with some detrimental impacts of *not* publishing such a work, which will be:

- **not appreciated**/retributed/credited or only by a small group of people.
- **not corrected** when applicable, whereas early publication is an well-known good practice to avoid building on false grounds. Nobody want to wait decades before learning his/her statistics are flawed.
- **not backed up **in copies, and so more easily lost.
- **not known**, and so *won’t prevent the creation of a similar database*.

![](https://cdn-images-1.medium.com/max/616/1*o6kMQc3UIl5V3pt__J_Jcg.png)

So, aside the need for credit (if not only to include it as part of a reliability index) and complying with legal issues (copyright, anonymization), any database should:

- **be published as soon as possible**. Forget about the “it’s not finished” excuse: a database (and any software product actually) is a entity that grows and evolves in the open;
- **be **[**open source**](https://github.com/RR0/rr0.org) so that raw data can be accessed and processes be audited;
- [**licenced to allow reuse**](https://rr0.org/Copyright.html) *with credit*.

### Interpretation

Building a database is not a goal *per se*: what you want is to leverage the data to produce some [analytical](https://rr0.org/science/crypto/ufo/analyse/) results, like [statistics](https://rr0.org/science/crypto/ufo/analyse/statistique/index.html). But most you can produce results from:

- **data** such as raw fields like date, time, location, description, witness info, etc.
- **inferred data **from the above, such as classification and conclusion (fake, IFO).

Most often, database authors (including myself) make the mistake of storing *single* values for the classification and conclusion of a case. For sure there can be some consensus about a given case, but not always: for instance, a number of investigators consider [Roswell](https://rr0.org/science/crypto/ufo/enquete/dossier/Roswell/index.html), [Mantell](http://localhost:4173/science/crypto/ufo/enquete/dossier/Mantell/), [McMinville](http://localhost:4173/science/crypto/ufo/enquete/dossier/McMinnville/)… as a closed cases, whereas some others still believe some conspiracy is at work to hide the truth. Think of what impact enforced conclusions can have on statistics. Think of the differences of a database built by [Keyhoe](https://rr0.org/people/k/KeyhoeDonaldE/index.html) and one built by [Klass](https://rr0.org/people/k/KlassPhilipJ/index.html).

![](https://cdn-images-1.medium.com/max/419/1*DVWZMruhINc4nsUmvDLxJQ.png)

So **a database should not enforce one conclusion or another, **since a conclusion is *not* data but a *function* of data. And among the parameters of this function is the set of investigations (i.e. sources) you choose to qualify for your analysis. Some may choose to include all available sources, and other will exclude some sources as unreliable or biased. And the produced results will bear the reliability of the selected sources.

Why am I saying that in the context of this article about database proliferation? Because **arbitrary interpretations is a motivator to build other non-biased (or differently biased) databases**.

So, instead of storing some investigation result as a unique data, databases should associate a case should be associated with a number of investigations (which would allow providing interesting additional investigational data), each of them having its own classification and conclusion.

### Unsupported use cases

We saw in the previous section the distinction between raw data and inferred data, and that the latter should be *produced* by **processes** the database comes featured with.

Typical processes are search/filtering, yearling/monthly/hourly occurrence statistics, geographical mapping, sighting duration, witnesses occupation, colors involved, etc. but, sure enough, you’ll be asked about one that you didn’t expect. “Can I search for pilot cases?” may be practicable, but “What about cases involving all tones or the red color (red, reddish, pinkish…)?” looks harder to satisfy. Same with queries like “Could I get cases that suggest inter-dimensional visitors?”

![](https://cdn-images-1.medium.com/max/539/1*ULrhF1NK2Cjl_2BnD_tQ9Q.png)

Spoiler: AI/[NLP](https://rr0.org/tech/info/soft/data/science/ml/nlp/index.html) will solve this by allowing to extract meaning from raw data (and so search/filter it) but in the interim, if you’ll get your users frustrated. And **users frustrated by the limited capabilities of a database are tempted to build their own**.

To mitigate this, you should:

- **implement user feature requests on the fly**; and/or
- **publish raw data**, so that users can play with it. For instance, RR0 is publishing its case summaries [in CSV format](https://github.com/RR0/rr0.org/blob/master/time/1/9/7/2/BeauJerome_RR0.csv).

## Conclusion

Users are encouraged to create their *own* databases when existing databases:

- are not known/published;
- target a scope that is not matching their cases of interest;
- miss or hide data that is of their interest;
- enforce a interpretation of the data;
- prevent some custom processing of their data.

Instead, a series of good practices should help to widen the audience and adoption of databases instead of re-creating them:

![An ideal UFO database, covering user cases of interest without data loss, and allowing access to raw data in case tailored processes would be required](https://cdn-images-1.medium.com/max/613/1*tnfLQ0zieFB50HsoGGtZcw.png)
*An ideal UFO database, covering user cases of interest without data loss, and allowing access to raw data in case tailored processes would be required*

- Maximize scope
- Publish (database access, raw and original data) early and allow reuse in a controlled license.
- Avoid data loss
