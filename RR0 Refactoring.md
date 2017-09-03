# RR0 Refactoring

## Motivation

* Improve performance by loading less (only requested contents, not all the webapp (header, menu, js) each time)
* Keep context (current search query and results)
* Compatibility with URLs referenced by Google

## Design 

The future default page, currently `/index.new.html` contains all the common markup around an `ui-view`, 
which will host the variable contents.

So every current page must redirect to this page with the path of the required contents as a `p` parameter. 
For example requesting `https://rr0.org/science/crypto/ufo/enquete/dossier/Roswell/index.html must redirect to
`https://rr0.org/index.new.html?p=https://rr0.org/science/crypto/ufo/enquete/dossier/Roswell/index.html`

## Setup

    npm install

### Generation

For data pages (contents of variable ui-view), [Jekyll](https://jekyllrb.com/docs/usage/) is used to generate static pages,
according to the `_config.yml` configuration.

To run it:

    jekyll build
    
(Add `--watch` to enable incremental build)
    
This will read all files found in the `source` configuration value (`.`), 
excluding the `exclude` configuration directories. For instance if `./time/index.jekyll.html` contains:

```
    ---
    layout: page
    title: Historique
    ---
    <p>...some text </p>
```

it will be processed according to the `_layouts/page.html` 
(which contains a `{{ content }}` placeholder)
to generate into the `destination` configuration directory a `build/time/index.jekyll.html`:

```
    <html>
    <title>Historique</title>
    <p>...some text </p>
```

<a name=build></a>
## Build 

Build is the process of:

1. compiling TypeScript into ES5 Javascript (see `tsconfig.json`)
1. compiling Sass into CSS3

It can be run through:

    npm build

## Deployment

Deployment is the process of:

1. Annotating the Angular ES5 code to support minification
1. Minify all the code (starting from `index.js`) in a single `dist/rr0.js` file.

It calls for a [build](#build) as a prerequiste.

It is performed through Webpack (see `webpack.cofig.js`), which is launched through:

    npm web