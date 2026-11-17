import { WebUdb } from '@rr0/udb'

// Absolute: the page is also served as /udb (no trailing slash), where "./" would resolve to the site root.
const webUdb = new WebUdb({ data: { dir: '/udb/' } })
window.udbController = webUdb.controller
