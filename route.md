# Migration

## Motivation

## Design

Single-page app using router to update parts of the page.

- `/header-start.html`, `/header-end.html` and `/footer.html` will disappear as header won't be reloaded anymore. 
  Its contents will be part of the new `/index2.html`
- `route.js` intercepts any path to
   1. fetch the requested page url
   2. Update the `textView` div with the fetched contents.
  
## Implementation

Build results is located in the `/dist` directory, including:

- `index2.html` resolved with optimized `rr0-xxx.js` code.
  