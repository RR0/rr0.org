import {HtmlSsgContext} from "../../../../HtmlSsgContext"

/**
 * @returns a string or undefined, depending on context.
 */
export type StringContextHandler = (context: HtmlSsgContext) => string | undefined
