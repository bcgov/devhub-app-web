import shortid from 'shortid';
import {
  PROCESSED_FILE_MD,
  PROCESSED_FILE_HTML,
  GRAPHQL_NODES_WITH_REGISTRY,
  CONFIG_OPTIONS,
} from '../__fixtures__/fixtures';
import { GRAPHQL_NODE_TYPE } from '../utils/constants';
import { sourceNodes } from '../sourceNodes';
import { fetchSourceGithub, validateSourceGithub } from '../utils/sources/github';

jest.mock('../utils/sources/github/index.js');
jest.unmock('unist-util-visit');

describe('Integration Tests Source Nodes', () => {
  beforeEach(() => {
    fetchSourceGithub.mockReturnValue(Promise.resolve([PROCESSED_FILE_MD, PROCESSED_FILE_HTML]));
    validateSourceGithub.mockReturnValue(true);
    // mock out short id generate to consistly return the same id
    shortid.generate = jest.fn(() => 1);
  });

  test('sourceNodes runs without crashing', async () => {
    const actions = {
      createNode: jest.fn(node => node),
      createParentChildLink: jest.fn(obj => obj),
    };

    const createNodeId = jest.fn(() => 1);
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    const collections = await sourceNodes({ actions, createNodeId, getNodes }, CONFIG_OPTIONS);
    expect(collections).toBeDefined();
  });
});
