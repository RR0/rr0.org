# RR0 timed data datasources

## Motivation

RR0 time data can be **imported** from external [Datasources](Datasource.ts), such as:

* Patrick Gross' website
    * [ACUFO](acufo)
    * [URECAT](urecat)
* [Base OVNI France](baseovnifrance)
* [Essex Police](essex-police)
* [FUFORA](fufora)
* [GEIPAN](../../org/eu/fr/cnes/geipan)
* [NUFORC](nuforc)
* [ufo-search](ufo-search)
* [RR0](rr0) itself, as static HTML to parse

## Analysis

An import is performed by setting up an `<ul>` tag replacement (for RR0 time pages) with a [ChronologyReplacerRefactory](ChronologyReplacerFactory.ts) which:

1. Fetches data
    - from the Web (using an [HttpSource](HttpSource.ts)), or
    - a (CSV) file.
1. Maps the data to a datasource-specific case
1. (optionally) saves the cases as a CSV file
1. Maps the datasource-specific case to a RR0 case.

## Design

### Datasources

All datasource fetchers implement the same Datasource API:
```mermaid
classDiagram
    class Datasource {
        authors: string[]
        copyright: string
        fetch(): S[]
    }
    class GeipanDataSource {
        fetch(): GeipanCase[]
    }
    Datasource <|-- GeipanDataSource
    class RR0DataSource {
        fetch(): RR0Case[]
    }
    Datasource <|-- RR0DataSource
    class FuforaDataSource {
        fetch(): FuforaCase[]
    }
    Datasource <|-- FuforaDataSource
    class BaseOvniDataSource {
        fetch(): FuforaCase[]
    }
    Datasource <|-- BaseOvniDataSource
```

Actually, a datasource can be implemented to fetch data using different techniques. Typically from the web (HTTP) or from a file:

```mermaid
classDiagram
    class Datasource {
        authors: string[]
        copyright: string
        fetch(): S[]
    }
    class HttpSource {
        get(url)
    }
    class GeipanHttpDataSource {
        fetch(): GeipanCase[]
    }
    Datasource <|-- GeipanHttpDataSource
    class GeipanFileDataSource {
        fetch(): GeipanCase[]
    }
    Datasource <|-- GeipanFileDataSource
    GeipanHttpDataSource --> HttpSource: http
    class FileSource {
        read(fileName)
    }
    GeipanFileDataSource --> FileSource: file
```

### Data

The goal is to map datasources-specific data to the following target model:

```mermaid
classDiagram
    class RR0Data {
        id: string
        type: string
        url?: URL
        name: string
        title: string
        time: TimeContext
    } 
    RR0Data --> Place: place?
    RR0Data --> People: people?
    RR0Data --> RR0Data: events[]
    class Sighting {
    }
    RR0Data <|-- Sighting
    class People {
    }
    RR0Data <|-- People
    class Place {
    }
    RR0Data <|-- Place
    class Case {
    }
    RR0Data <|-- Case
    class Source {
    }
    RR0Data <|-- Source
    class Investigation {
    }
    RR0Data <|-- Investigation
```

### Case data

A case is an aggregation of investigations about what is considered to be the same stimulus.
As such, it indirectly references all the investigated sightings.

```mermaid
classDiagram
    class Source {
        
    }
    class Sighting {
        place: Place
        time: TimeContext
    }
    Sighting --> Source: source
    class People {
    }
    Source <|-- Photo
    Source <|-- Video
    Source <|-- RadarTracking
    Source <|-- GroundTrace
    Source <|-- Testimonial
    class Testimonial {
    }
    Testimonial --> People: witness
    Investigation --> People: investigator
    class Investigation {
        classification(type): Classification
        conclusion?: "hoax" | "misinterpretation"
        explanation: Explanation
    }
    Investigation --> Sighting: sightings[]
    class Case {
        id: string
        title: string
        getSightings(): Set<Sightings>
    }
    Case --> Investigation: investigations[]
```

### Context

The context is the state from which an event occurs:

```mermaid
classDiagram
    class RR0Context {
        
    }
```
