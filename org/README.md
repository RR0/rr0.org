# Organizations

Organization are bureaucratic entities created by human.

Since they are usually hierarchical, they often reference a `parent` organization (a region references a country, etc.).

```mermaid
classDiagram
    class RR0Data {
    }
    class Organization {
        type: "org"
        getMessages(context): OrganizationMessages
        getTitle(context, options): string
    }
    Organization --> Organization: parent
    RR0Data <|-- Organization
    Organization <|-- Country
    Organization <|-- Region
    Organization <|-- Department
    Organization <|-- City

```

Organization may also refer to a place (a City for instance), but can reference several places.

## Messages

Organization-specific messages (how to mention an organization in a text using a given language, typically) can be obtained using the `getMessage(context)` method.

By default, this will use the `parent` link to build a fully descriptive organization name, by combining the organization name with its parent organizations names.

```mermaid
classDiagram
    class OrganizationMessages {
        titles: string[]
        toTitle(context, org, options): string
    }
    OrganizationMessages <|-- CountryMessages
    OrganizationMessages <|-- RegionMessages
    OrganizationMessages <|-- DepartmentMessages
    OrganizationMessages <|-- CityMessages
```
