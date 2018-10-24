// configuring enzyme to use the adapter for React 16
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// mock out graph ql
global.graphql = jest.fn();

module.exports = Enzyme.configure({ adapter: new Adapter() });
