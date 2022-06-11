module.exports = function (eleventyConfig) {
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "croyance/conspirationnisme/enquete/dossier/glyphosate",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site"
    }
  }
}
