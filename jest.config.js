module.exports = {
  testMatch: ['**/__tests__/**/*.js', '**/src/**/*.test.js'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js"],
  verbose: true
}
