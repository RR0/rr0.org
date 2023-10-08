export interface Book {
  dirName?: string;
  title: string
  subTitle?: string
  authors: string[]
  series?: string
  publication: {
    time: string
    publisher: string
  }
  isbn?: string
  summary: string
}
