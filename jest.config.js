module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "jest-localstorage-mock"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};