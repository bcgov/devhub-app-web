import { PROCESSED_FILE, GRAPHQL_NODES_WITH_REGISTRY, } from '../__fixtures__/fixtures';
import { sourceNodes, } from '../sourceNodes';
import { transformer, } from '../utils/transformer';
import { markdownPlugin, } from '../utils/plugins';
import { getFilesFromRepo, } from '../utils/github-api';

jest.mock('../utils/github-api.js');
jest.unmock('unist-util-visit');

describe('Integration Tests Source Nodes', () => {
    beforeEach(() => {
        getFilesFromRepo.mockReturnValue(Promise.resolve([PROCESSED_FILE,]));
    });

    test('source nodes calls create node', async () => {
        const boundActionCreators = {
            createNode: jest.fn(),
        };
        const createNodeId = jest.fn(() => 1);
        const token = '123';
        const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
        await sourceNodes({boundActionCreators, createNodeId, getNodes,}, { token, });

        expect(boundActionCreators.createNode).toHaveBeenCalledTimes(1);
    });

    test('file content gets transformed if its markdown', async () => {
        const boundActionCreators = {
            createNode: jest.fn(),
        };
        // const createNodeId = jest.fn(() => 1);
        // const token = '123';
        // const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
        // const transformedContent = 
        // expect(PROCESSED_FILE.content).not.toEqual()
        // await sourceNodes({boundActionCreators, createNodeId, getNodes}, { token });

        // console.log(nodeData);
        // expect(boundActionCreators.createNode).toHaveBeenCalledWith(1);
    });
});


