module.exports = {
  globals: {
    __PATH_PREFIX__: '',
  },
  transform: {
    '.(js|jsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.cache/', '/cypress/'],
  moduleFileExtensions: ['js', 'module.css', '.css', 'json']
};
