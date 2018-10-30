import shortid from 'shortid'; // eslint-disable-line
import { PROCESSED_FILE_MD, PROCESSED_FILE_TXT, GRAPHQL_NODES_WITH_REGISTRY, } from '../__fixtures__/fixtures';
import { sourceNodes, createGHNode, } from '../sourceNodes';
import { getFilesFromRepo, } from '../utils/github-api';

jest.mock('../utils/github-api.js');
jest.unmock('unist-util-visit');

describe('Integration Tests Source Nodes', () => {
    beforeEach(() => {
        getFilesFromRepo.mockReturnValue(Promise.resolve([ PROCESSED_FILE_MD, ]));
        // mock out short id generate to consistly return the same id
        shortid.generate = jest.fn(() => 1);
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
        const createNodeId = jest.fn(() => 1);
        const token = '123';
        const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
        await sourceNodes({boundActionCreators, createNodeId, getNodes,}, { token, });
        // create a graphql node bypassing the transformer in sourceNodes
        const node = createGHNode(PROCESSED_FILE_MD, createNodeId());
        // this markdown file should have been transformed and there for nodes
        // should not be equal
        expect(boundActionCreators.createNode).not.toHaveBeenCalledWith(node);
    });
    
});
