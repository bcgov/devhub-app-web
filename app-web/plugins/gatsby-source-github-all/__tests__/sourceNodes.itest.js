import shortid from 'shortid'; // eslint-disable-line
import {
  PROCESSED_FILE_MD,
  PROCESSED_FILE_HTML,
  GRAPHQL_NODES_WITH_REGISTRY,
  CONFIG_OPTIONS,
} from '../__fixtures__/fixtures';
import { GRAPHQL_NODE_TYPE } from '../utils/constants';
import { sourceNodes, createSiphonNode } from '../sourceNodes';
import { getFilesFromRepo, validateSourceGithub } from '../utils/fetchSourceGithub';

jest.mock('../utils/fetchSourceGithub.js');
jest.unmock('unist-util-visit');

describe('Integration Tests Source Nodes', () => {
  beforeEach(() => {
    getFilesFromRepo.mockReturnValue(Promise.resolve([PROCESSED_FILE_MD, PROCESSED_FILE_HTML]));
    validateSourceGithub.mockReturnValue(true);
    // mock out short id generate to consistly return the same id
    shortid.generate = jest.fn(() => 1);
  });

  test('sourceNodes creates nodes of type DevhubSyphon', async () => {
    const boundActionCreators = {
      createNode: node => node,
    };
    const createNodeId = jest.fn(() => 1);
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    const nodes = await sourceNodes(
      { boundActionCreators, createNodeId, getNodes },
      CONFIG_OPTIONS
    );
    expect(nodes.every(node => node.internal.type === GRAPHQL_NODE_TYPE)).toBe(true);
  });
});
