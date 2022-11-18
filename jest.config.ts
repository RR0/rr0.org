/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!@googlemaps|ssg-api)"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.[tj]s$": "ts-jest"
  }
}
