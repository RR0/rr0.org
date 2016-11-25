# SAP Refactoring

## Motivation

* Improve performance by loading less (only requested contents, not all the webapp (header, menu, js) each time)
* Keep context (current search query and results)

## Goals

- Fulfill motivations 
- Transparent migration for users, notably:
  - access from external URLs (say http://rr0.org/science/crypto/ufo/enquete/dossier/Roswell/index.html for example)

## Migration 

The future default page, currently `/index.new.html` contains all the common markup around an `ui-view`, 
which will host the variable contents.

So every current page must redirect to this page with the path of the required contents as a `p` parameter. 
For example requesting `http://rr0.org/science/crypto/ufo/enquete/dossier/Roswell/index.html must redirect to
`http://rr0.org/index.new.html?p=http://rr0.org/science/crypto/ufo/enquete/dossier/Roswell/index.html`