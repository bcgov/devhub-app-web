jest.requireActual('string-similarity');

module.exports = {
  findBestMatch: match => {
    return {
      bestMatch: {
        target: match,
        rating: 1,
      },
    };
  },
};
