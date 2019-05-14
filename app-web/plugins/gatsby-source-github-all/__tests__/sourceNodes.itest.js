import shortid from 'shortid';
import {
  PROCESSED_FILE_MD,
  PROCESSED_FILE_HTML,
  GRAPHQL_NODES_WITH_REGISTRY,
  CONFIG_OPTIONS,
} from '../__fixtures__/fixtures';
import { sourceNodes } from '../sourceNodes';
import { fetchSourceGithub, validateSourceGithub } from '../utils/sources/github';
import { validateRegistryItem } from '../utils/registryHelpers';
jest.mock('../utils/sources/github/index.js');
jest.unmock('unist-util-visit');

describe('Integration Tests Source Nodes', () => {
  beforeEach(() => {
    fetchSourceGithub.mockReturnValue(Promise.resolve([PROCESSED_FILE_MD, PROCESSED_FILE_HTML]));
    validateSourceGithub.mockReturnValue(true);
    // mock out short id generate to consistly return the same id
    shortid.generate = jest.fn(() => 1);
  });

  test('validateRegistryItem returns true if name and sourceProperties exist', () => {
    const registryItem = {
      name: 'foo',
      sourceProperties: {},
    };
    expect(validateRegistryItem(registryItem)).toBe(true);
  });

  test("validateRegistry returns false if name or sourceProperties don't exist", () => {
    const registryItem1 = {
      sourceProperties: {},
    };

    const registryItem2 = {
      name: 'foo',
    };

    expect(validateRegistryItem(registryItem1)).toBe(false);
    expect(validateRegistryItem(registryItem2)).toBe(false);
  });

  test('sourceNodes runs without crashing', async () => {
    jest.setTimeout(10000); // increase timeout to 10 seconds from 5 sec default, this seems to help tests
    // in openshift
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
