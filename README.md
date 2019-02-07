# RR0

The aim of this project is to migrate RR0 to Angular 6+.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Testing

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Manual tests

To get complete rendering you'll need to have included files, either by

- running an Apache server with mod_include enabled
- processing all files to inline included files statically (using Jekyll typically)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3._

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

## Build 

Build is the process of:

1. compiling TypeScript into ES5 Javascript (see `tsconfig.json`)
1. compiling Sass into CSS3

It can be run through:

    npm run build
    
which produces an output into the `dist` directory.

## Deployment

Deployment is the process of:

1. Annotating the Angular ES5 code to support minification
1. Minify all the code (starting from `index.js`) in a single `dist/rr0.js` file.

It calls for a [build](#build) as a prerequiste.

It is performed through Webpack (see `webpack.cofig.js`), which is launched through:

    npm run web
