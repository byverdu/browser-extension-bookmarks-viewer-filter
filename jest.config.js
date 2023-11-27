/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/extension/libs/*.js',
    '!src/extension/types/*.js',
  ],
  testEnvironment: 'jsdom',
  testRegex: '__tests__/.*\\.spec\\.js$',
  setupFilesAfterEnv: ['./jest.setup.js'],
};

export default config;
