# RR0 v2.0

## Motivation

* Update to latest Angular

## Design 

Same as before, modulo

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

## Build 


## Deployment

