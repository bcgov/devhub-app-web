jest.requireActual('string-similarity');

module.exports = {
  bestMatch: match => {
    return {
      bestMatch: {
        target: match,
        rating: 1,
      },
    };
  },
};
