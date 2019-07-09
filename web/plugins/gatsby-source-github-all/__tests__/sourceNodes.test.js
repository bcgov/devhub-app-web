//
// Dev Hub
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Patrick Simonian on 2018-10-12.
//
import {
  checkRegistry,
  getRegistry,
  filterIgnoredResources,
  sourcesAreValid,
  mapInheritedSourceAttributes,
  getFetchQueue,
  normalizePersonas,
  processSource,
  getContentForCollection,
  processCollection,
} from '../sourceNodes';
import { createSiphonNode, createCollectionNode } from '../utils/createNode';
import { GRAPHQL_NODE_TYPE, COLLECTION_TYPES, COLLECTION_TEMPLATES } from '../utils/constants';
import {
  GRAPHQL_NODES_WITH_REGISTRY,
  GRAPHQL_NODES_WITHOUT_REGISTRY,
  REGISTRY,
  REGISTRY_WITH_COLLECTION,
  COLLECTION_OBJ_FROM_FETCH_QUEUE,
  WEB_SOURCE,
  PROCESSED_WEB_SOURCE,
  PROCESSED_FILE_MD,
  SOURCE_REGISTRY_TYPE,
} from '../__fixtures__/fixtures';
import { validateSourceRegistry, fetchFromSource } from '../utils/fetchSource';
import {
  isSourceCollection,
  hashString,
  validateRegistryItemAgainstSchema,
  validateAgainstSchema,
  newCollection,
  assignPositionToCollection,
  assignPositionToSource,
  convertPositionToSortableString,
  assignPositionToResource,
} from '../utils/helpers';

jest.mock('../utils/helpers');
jest.mock('crypto');
jest.mock('../utils/fetchSource.js');
fetchFromSource.mockReturnValue(Promise.resolve([PROCESSED_WEB_SOURCE]));
newCollection.mockImplementation((collection, props) => ({ ...collection, ...props }));
assignPositionToCollection.mockImplementation(collection => () => ({
  metadata: { position: [0] },
}));

assignPositionToResource.mockImplementation(source => resource => ({
  ...resource,
  metadata: { ...resource.metadata, position: [0] },
}));

convertPositionToSortableString.mockImplementation((padding, position) => position.join('.'));

assignPositionToSource.mockImplementation(source => () => ({ metadata: { position: [0, 0] } }));

describe('gatsby source github all plugin', () => {
  afterEach(() => {
    isSourceCollection.mockReset();
    fetchFromSource.mockClear();
  });

  test('filterIgnoreResources returns a filtered set of sources', () => {
    const sources = [
      {
        metadata: {
          ignore: true,
        },
      },
      {
        metadata: {
          ignore: false,
        },
      },
      {
        metadata: {
          apple: true,
        },
      },
    ];

    const expected = [
      {
        metadata: {
          ignore: false,
        },
      },
      {
        metadata: {
          apple: true,
        },
      },
    ];

    expect(filterIgnoredResources(sources)).toEqual(expected);
  });

  test('getRegistry returns the registry', () => {
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    const registry = getRegistry(getNodes, SOURCE_REGISTRY_TYPE);
    expect(registry).toBeDefined();
    expect(registry.length).toBeGreaterThan(0);
  });

  test('getRegistry throws if no registry exists', () => {
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITHOUT_REGISTRY);
    expect(() => getRegistry(getNodes, SOURCE_REGISTRY_TYPE)).toThrow('Registry not found');
  });

  test('getRegistry returns with apecified registry json file', () => {
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    const registry = getRegistry(getNodes, SOURCE_REGISTRY_TYPE);
    expect(registry).toBeDefined();
  });

  test('checkRegistry returns true if sources are valid', () => {
    validateSourceRegistry.mockReturnValue(true);
    validateRegistryItemAgainstSchema.mockReturnValue(true);
    expect(checkRegistry(REGISTRY)).toBe(true);
  });

  test("checkRegistry throws if sources don't exist or if sources are invalid", () => {
    const BAD_REGISTRY = null;

    expect(() => checkRegistry(BAD_REGISTRY)).toThrow(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters',
    );

    validateSourceRegistry.mockReturnValue(false);

    expect(() => checkRegistry(REGISTRY)).toThrow(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters',
    );
  });

  test('createSiphonNode returns data', () => {
    const file = {
      metadata: {
        position: [1, 1, 1],
        collection: {
          name: 'foo',
          type: COLLECTION_TYPES.CURATED,
        },
        id: 'file-stub-id',
        name: 'test',
        source: 'something/something',
        sourceName: 'something',
        owner: 'Billy Bob',
        fileType: 'Markdown',
        fileName: 'test.md',
        mediaType: 'application/test',
        extension: '.md',
        labels: 'component',
        originalResourceLocation:
          'https://github.com/awesomeOrg/awesomeRepo/blob/master/public/manifest.json',
        sourceProperties: {
          branch: 'master',
          repo: 'foo',
          owner: 'bar',
        },
      },
      name: 'test',
      path: '/test.md',
      sha: '123',
      size: 317,
      url:
        'https://api.github.com/repos/awesomeOrg/awesomeRepo/contents/public/manifest.json?ref=master',
      html_url: 'https://github.com/awesomeOrg/awesomeRepo/blob/master/public/manifest.json',
      git_url: 'https://api.github.com/repos/awesomeOrg/awesomeRepo/git/blobs/123',
      download_url:
        'https://raw.githubusercontent.com/awesomeOrg/awesomeRepo/master/public/manifest.json',
      type: 'file',
      content: 'content',
      _links: {
        self:
          'https://api.github.com/repos/awesomeOrg/awesomeRepo/contents/public/manifest.json?ref=master',
        git: 'https://api.github.com/repos/awesomeOrg/awesomeRepo/git/blobs/123',
        html: 'https://github.com/awesomeOrg/awesomeRepo/blob/master/public/manifest.json',
      },
    };

    hashString.mockReturnValue(null);

    expect(createSiphonNode(file, '123', 'foo')).toMatchSnapshot();
  });

  test('createCollectionNode returns an object', () => {
    const result = createCollectionNode(COLLECTION_OBJ_FROM_FETCH_QUEUE, '123');
    const expected = {
      id: '123',
      name: COLLECTION_OBJ_FROM_FETCH_QUEUE.name,
      type: COLLECTION_OBJ_FROM_FETCH_QUEUE.type,
      description: COLLECTION_OBJ_FROM_FETCH_QUEUE.description,
      children: [],
      parent: null,
      internal: {
        contentDigest: null, // hash string called here
        type: GRAPHQL_NODE_TYPE.COLLECTION,
      },
      _metadata: {
        position: COLLECTION_OBJ_FROM_FETCH_QUEUE.metadata.position.join('.'),
        slug: COLLECTION_OBJ_FROM_FETCH_QUEUE.slug,
        template: COLLECTION_TEMPLATES.DEFAULT,
        templateFile: undefined,
        sourceLocations: undefined,
      },
    };
    hashString.mockReturnValue(null);
    expect(result).toEqual(expected);
  });

  test('createCollectionNode returns an internal mime type of markdown plus content is collection content is passed in', () => {
    const result = createCollectionNode(COLLECTION_OBJ_FROM_FETCH_QUEUE, '123', {
      content: 'hello world',
      metadata: {
        mediaType: 'text/markdown',
      },
    });

    const expected = {
      id: '123',
      name: COLLECTION_OBJ_FROM_FETCH_QUEUE.name,
      type: COLLECTION_OBJ_FROM_FETCH_QUEUE.type,
      description: COLLECTION_OBJ_FROM_FETCH_QUEUE.description,
      children: [],
      parent: null,
      internal: {
        contentDigest: null, // hash string called here
        type: GRAPHQL_NODE_TYPE.COLLECTION,
        content: 'hello world',
        mediaType: 'text/markdown',
      },
      _metadata: {
        position: COLLECTION_OBJ_FROM_FETCH_QUEUE.metadata.position.join('.'),
        slug: COLLECTION_OBJ_FROM_FETCH_QUEUE.slug,
        template: COLLECTION_TEMPLATES.DEFAULT,
        templateFile: undefined,
        sourceLocations: undefined,
      },
    };
    hashString.mockReturnValue(null);
    expect(result).toEqual(expected);
  });

  test('sourcesAreValid handles collections of sources', () => {
    validateSourceRegistry.mockClear();
    validateSourceRegistry.mockReturnValue(true);
    isSourceCollection.mockReturnValueOnce(true);

    sourcesAreValid(REGISTRY_WITH_COLLECTION);
    expect(validateSourceRegistry).toHaveBeenCalledTimes(
      REGISTRY_WITH_COLLECTION[0].sourceProperties.sources.length,
    );
  });

  test('maps inherited source props', () => {
    const rootSource = {
      name: 'foo',
      resourceType: 'Designer',
    };
    const childSource = {
      sourceType: 'github',
      sourceProperties: {
        repo: 'blah',
        owner: 'foo',
        url: '/',
      },
    };

    const result = mapInheritedSourceAttributes(rootSource, childSource);
    expect(result.name).toBe(rootSource.name);
    expect(result.resourceType).toBe(rootSource.resourceType);
    expect(result.attributes).toEqual({
      personas: [],
    });
  });

  // get fetch queue should return a list of collections that contain a list of sources to fetch
  test('creates a fetch queue with for a source collection', async () => {
    isSourceCollection.mockReturnValue(false);
    const result = await getFetchQueue(REGISTRY);
    expect(result.length).toBe(REGISTRY.length);
    expect(result[0].sources.length).toBe(1);
  });

  test('creates a fetch queue with for a curated collection', async () => {
    isSourceCollection.mockReturnValue(true);
    const result2 = await getFetchQueue(REGISTRY_WITH_COLLECTION);
    expect(result2.length).toBe(REGISTRY_WITH_COLLECTION.length);

    expect(result2[0].sources.length).toBe(
      REGISTRY_WITH_COLLECTION[0].sourceProperties.sources.length,
    );
  });

  test('getFetchQueue passes the correct collection type', async () => {
    isSourceCollection.mockReturnValue(false);
    const result = await getFetchQueue(REGISTRY);
    expect(result[0].type).toBe(COLLECTION_TYPES.github);

    isSourceCollection.mockReturnValue(true);
    const result2 = await getFetchQueue(REGISTRY_WITH_COLLECTION);
    expect(result2[0].type).toBe(COLLECTION_TYPES.CURATED);
  });

  test('normalize personas converts persona into personas when alone', () => {
    const attributes = {
      persona: 'Designer',
    };

    const expected = {
      persona: 'Designer',
      personas: ['Designer'],
    };

    expect(normalizePersonas(attributes)).toEqual(expected);
  });

  test('normalize personas leaves personas unchanged when valid', () => {
    const attributes = {
      personas: ['Designer'],
    };

    const expected = {
      personas: ['Designer'],
    };

    expect(normalizePersonas(attributes)).toEqual(expected);
  });

  test('normalize personas uses personas over persona when there is conflict', () => {
    const attributes = {
      personas: ['Designer'],
      persona: 'Developer',
    };

    const expected = {
      personas: ['Designer'],
      persona: 'Developer',
    };

    expect(normalizePersonas(attributes)).toEqual(expected);
  });

  test('normalize personas returns personas as empty array when invalid', () => {
    const attributes = {
      personas: 12,
      persona: 123,
    };

    const expected = {
      personas: [],
      persona: 123,
    };

    expect(normalizePersonas(attributes)).toEqual(expected);
  });

  test('returns a list of source node objects', async () => {
    const createNodeId = jest.fn(() => 1);
    const createNode = jest.fn(node => node);
    const result = await processSource(WEB_SOURCE, createNodeId, createNode, {});

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);

    const node = result[0];

    expect(typeof node).toBe('object');
    // validate the 'node' has properties that would only exist if the createNode fn was called to create the object
    expect(node.id).toBeDefined();
  });

  test('returns a collection object', async () => {
    const createNodeId = jest.fn(() => 1);
    const createNode = jest.fn(node => node);
    const createParentChildLink = jest.fn();

    const result = await processCollection(
      COLLECTION_OBJ_FROM_FETCH_QUEUE,
      createNodeId,
      createNode,
      createParentChildLink,
      {},
    );

    expect(typeof result).toBe('object');
    // assert we get the original collection properties back
    expect(result.name).toBe(COLLECTION_OBJ_FROM_FETCH_QUEUE.name);
    // assert that its actually a grpahql node by again checking if an id was added
    expect(result.id).toBeDefined();
  });

  test('calls the fetch source routine for each source in a collection object', async () => {
    const createNodeId = jest.fn(() => 1);
    const createNode = jest.fn(node => node);
    const createParentChildLink = jest.fn();

    await processCollection(
      COLLECTION_OBJ_FROM_FETCH_QUEUE,
      createNodeId,
      createNode,
      createParentChildLink,
      {},
    );
    // it should be called for as many sources that exist within the collection
    expect(fetchFromSource).toHaveBeenCalledTimes(COLLECTION_OBJ_FROM_FETCH_QUEUE.sources.length);
  });

  test('establishes a parent child link for each resource fetched for a collection', async () => {
    const createNodeId = jest.fn(() => 1);
    const createNode = jest.fn(node => node);
    const createParentChildLink = jest.fn();

    await processCollection(
      COLLECTION_OBJ_FROM_FETCH_QUEUE,
      createNodeId,
      createNode,
      createParentChildLink,
      {},
    );

    // fetch from source returns a single web source node
    // in total only 1 resource was returned from all sources fetched for the fixtured collection
    // therefor the createparent child link should only be called once
    expect(createParentChildLink).toHaveBeenCalledTimes(1);
  });

  test('getContentForCollection returns data', async () => {
    fetchFromSource.mockReturnValueOnce(Promise.resolve([PROCESSED_FILE_MD]));
    validateAgainstSchema.mockReturnValueOnce({
      isValid: true,
      messages: [],
    });

    const collectionSource = {
      repo: 'foo',
      owner: 'bar',
      file: 'file.md',
    };

    const data = await getContentForCollection(collectionSource, { token: 123 }, 'collection name');
    expect(data).toEqual(PROCESSED_FILE_MD);
  });

  test('getContentForCollection returns {} when invalid source properties', async () => {
    fetchFromSource.mockReturnValueOnce(Promise.resolve([PROCESSED_FILE_MD]));
    validateAgainstSchema.mockReturnValueOnce({
      isValid: false,
      messages: [],
    });

    const collectionSource = {
      repo: 'foo',
      owner: 'bar',
      file: 'file.md',
    };

    const data = await getContentForCollection(collectionSource, { token: 123 }, 'collection name');
    expect(data).toEqual({});
  });
});
