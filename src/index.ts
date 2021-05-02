import {Board} from "board/Board"
import {User} from "User"
import {PalPlugin} from "board/plugins/PalPlugin"
import {BoardWebView} from "board/view/BoardWebView"

let boardAnchor = "#boards"
const anchor = window.document.querySelector(boardAnchor)
if (!anchor) {
  throw new Error(`Could not find board anchor "${boardAnchor}" in window document`)
}
const view = new BoardWebView(anchor)
const board = new Board(view)

let palPlugin = new PalPlugin()
board.register(palPlugin)

const user = new User()

board.run(user)
