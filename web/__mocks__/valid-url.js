jest.requireActual('valid-url');

module.exports = {
  isUri: jest.fn(url => url),
  isWebUri: jest.fn(url => url),
};
