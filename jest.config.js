/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!@googlemaps|ssg-api)"],
  transform: {
    "^.+\\.[tj]s$": "ts-jest"
  }
}
