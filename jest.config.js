/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['extension/**/*.js'],
  testEnvironment: 'jsdom',
  testRegex: '__tests__/.*\\.spec\\.js$',
  setupFilesAfterEnv: ['./jest.setup.js'],
};

export default config;
