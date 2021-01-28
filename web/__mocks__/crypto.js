jest.requireActual('crypto');

module.exports = {
  createHash: () => ({
    update: text => ({
      digest: () => text,
    }),
  }),
};
