const shortid = jest.requireActual('shortid');
let count = 0;
module.exports = { generate: () => count++ };
