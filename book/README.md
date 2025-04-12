# Books

## Importation

Books database can be imported:

1. Export the BookBuddy database as a CSV file
2. Execute `npm run books` or run `BookImport --import BookBuddy.csv`

(Note: if you want to test the result of an import without actually importing, add the `--dry true` parameter)

## Implementation

- [`BookBuddy.csv`](BookBuddy.csv) A list of book of interest, exported from the [BookBuddy](https://apps.apple.com/ca/app/bookbuddy-ma-biblioth%C3%A8que/id395150347) app.
- [`BookImport.ts`](BookImport.ts) A CLI tool to generate RR0 pages from the [`BookBuddy.csv`](BookBuddy.csv) mentioned above.
