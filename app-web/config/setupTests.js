// configuring enzyme to use the adapter for React 16
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

expect.addSnapshotSerializer(createSerializer(emotion));
// mock out graph ql
global.graphql = jest.fn();

module.exports = Enzyme.configure({ adapter: new Adapter() });
