module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs"
  }
}
