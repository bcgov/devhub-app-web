// configuring enzyme to use the adapter for React 16
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

expect.addSnapshotSerializer(createSerializer(emotion));
// mock out graph ql
global.graphql = jest.fn();
