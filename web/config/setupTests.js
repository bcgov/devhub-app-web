// configuring enzyme to use the adapter for React 16
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';
import { createSerializer as toJSON } from 'enzyme-to-json';
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

expect.addSnapshotSerializer(toJSON());
expect.addSnapshotSerializer(createSerializer(emotion));
// mock out graph ql
global.graphql = jest.fn();

module.exports = Enzyme.configure({ adapter: new Adapter() });
