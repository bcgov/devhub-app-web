import shortid from 'shortid'; // eslint-disable-line
import {
  PROCESSED_FILE_MD,
  PROCESSED_FILE_HTML,
  GRAPHQL_NODES_WITH_REGISTRY,
  CONFIG_OPTIONS,
} from '../__fixtures__/fixtures';
import { GRAPHQL_NODE_TYPE } from '../utils/constants';
import { sourceNodes, createGHNode } from '../sourceNodes';
import { getFilesFromRepo, validateSourceGithub } from '../utils/fetchSourceGithub';

jest.mock('../utils/fetchSourceGithub.js');
jest.unmock('unist-util-visit');

describe('Integration Tests Source Nodes', () => {
  beforeEach(() => {
    getFilesFromRepo.mockReturnValue(Promise.resolve([[PROCESSED_FILE_MD, PROCESSED_FILE_HTML]]));
    validateSourceGithub.mockReturnValue(true);
    // mock out short id generate to consistly return the same id
    shortid.generate = jest.fn(() => 1);
  });

  test('source nodes calls create node', async () => {
    const boundActionCreators = {
      createNode: jest.fn(),
    };
    const createNodeId = jest.fn(() => 1);
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    await sourceNodes({ boundActionCreators, createNodeId, getNodes }, CONFIG_OPTIONS);
    expect(boundActionCreators.createNode).toHaveBeenCalledTimes(1);
  });

  test('file content gets transformed if its markdown', async () => {
    const boundActionCreators = {
      createNode: jest.fn(),
    };
    const createNodeId = jest.fn(() => 1);
    const token = '123';
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    await sourceNodes({ boundActionCreators, createNodeId, getNodes }, CONFIG_OPTIONS);
    // create a graphql node bypassing the transformer in sourceNodes
    const node = createGHNode(PROCESSED_FILE_MD, createNodeId());
    // this markdown file should have been transformed and there for nodes
    // should not be equal
    expect(boundActionCreators.createNode).not.toHaveBeenCalledWith(node);
  });

  test('sourceNodes creates nodes of type DevhubSyphon', async () => {
    const boundActionCreators = {
      createNode: node => node,
    };
    const createNodeId = jest.fn(() => 1);
    const token = '123';
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    const nodes = await sourceNodes({ boundActionCreators, createNodeId, getNodes }, CONFIG_OPTIONS);
    expect(nodes.every(node => node.internal.type === GRAPHQL_NODE_TYPE)).toBe(true);
  });
});
