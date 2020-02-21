module.exports = {
  globals: {
    __PATH_PREFIX__: '',
  },
  transform: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/fileTransformer.js',
    '^.+\\.(js|jsx)$': '<rootDir>/config/jest/jestPreprocess.js',
  },
  testRegex: '(\\.(i?test|spec))\\.(jsx|js)$',
  testPathIgnorePatterns: ['/node_modules/', '/.cache/', '/cypress/'],
  moduleFileExtensions: ['js', 'module.css', '.css', 'json'],
  moduleNameMapper: {
    '\\.module\\.(css|less)$': 'identity-obj-proxy',
    '\\.(css|less)$': 'identity-obj-proxy',
    '.(css)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  setupFiles: ['raf/polyfill', 'jest-localstorage-mock', '<rootDir>/config/jest/loadershim.js'],
};
