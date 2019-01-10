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
  processCollection,
  validateRegistryItem,
} from '../sourceNodes';
import { createSiphonNode, createCollectionNode } from '../utils/createNode';
import { GRAPHQL_NODE_TYPE, COLLECTION_TYPES } from '../utils/constants';
import {
  GRAPHQL_NODES_WITH_REGISTRY,
  GRAPHQL_NODES_WITHOUT_REGISTRY,
  REGISTRY,
  REGISTRY_WITH_COLLECTION,
  COLLECTION_OBJ_FROM_FETCH_QUEUE,
  WEB_SOURCE,
  PROCESSED_WEB_SOURCE,
} from '../__fixtures__/fixtures';
import { validateSourceRegistry, fetchFromSource } from '../utils/fetchSource';
import { isSourceCollection, hashString, validateRegistryItemAgainstSchema } from '../utils/helpers';

jest.mock('../utils/helpers');
jest.mock('crypto');
jest.mock('../utils/fetchSource.js');
fetchFromSource.mockReturnValue(Promise.resolve([PROCESSED_WEB_SOURCE]));

describe('gatsby source github all plugin', () => {
  afterEach(() => {
    isSourceCollection.mockReset();
    fetchFromSource.mockClear();
  });
  const sourceRegistryType = 'SourceRegistryYaml';
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
    const registry = getRegistry(getNodes, sourceRegistryType);
    expect(registry).toBeDefined();
    expect(registry.sources.length).toBeGreaterThan(0);
  });

  test('getRegistry throws if no registry exists', () => {
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITHOUT_REGISTRY);
    expect(() => getRegistry(getNodes, sourceRegistryType)).toThrow('Registry not found');
  });

  test('getRegistry returns with apecified registry yaml file', () => {
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_REGISTRY);
    const registry = getRegistry(getNodes, sourceRegistryType);
    expect(registry).toBeDefined();
  });

  test('checkRegistry returns true if sources are valid', () => {
    validateSourceRegistry.mockReturnValue(true);
    validateRegistryItemAgainstSchema.mockReturnValue(true);
    expect(checkRegistry(REGISTRY)).toBe(true);
  });

  test("checkRegistry throws if sources don't exist or if sources are invalid", () => {
    const BAD_REGISTRY = { ...REGISTRY, sources: null };

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
        collection: {
          name: 'foo',
          type: COLLECTION_TYPES.CURATED,
        },
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

    const expected = {
      id: '123',
      children: [],
      fileName: 'test.md',
      fileType: 'Markdown',
      name: 'test',
      owner: 'Billy Bob',
      parent: null,
      path: '/test.md',
      collection: {
        name: 'foo',
        type: COLLECTION_TYPES.CURATED,
      },
      attributes: {
        labels: 'component',
        personas: undefined,
      },
      source: {
        name: 'something/something',
        displayName: 'something',
        sourcePath: undefined,
        type: undefined,
        _properties: {
          branch: 'master',
          repo: 'foo',
          owner: 'bar',
        },
      },
      unfurl: undefined,
      resource: {
        originalSource:
          'https://github.com/awesomeOrg/awesomeRepo/blob/master/public/manifest.json',
        type: undefined,
        path: undefined,
      },
      internal: {
        contentDigest: null, // hashstring called here
        // Optional media type (https://en.wikipedia.org/wiki/Media_type) to indicate
        // to transformer plugins this node has data they can further process.
        mediaType: 'application/test',
        // A globally unique node type chosen by the plugin owner.
        type: GRAPHQL_NODE_TYPE.SIPHON,
        // Optional field exposing the raw content for this node
        // that transformer plugins can take and further process.
        content: 'content',
      },
    };

    hashString.mockReturnValue(null);

    expect(createSiphonNode(file, '123')).toEqual(expected);
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
    };
    hashString.mockReturnValue(null);
    expect(result).toEqual(expected);
  });

  test('sourcesAreValid handles collections of sources', () => {
    validateSourceRegistry.mockClear();
    validateSourceRegistry.mockReturnValue(true);
    const sources = REGISTRY.sources.concat(REGISTRY_WITH_COLLECTION.sources);
    // mock returning different values. since the root sources frmo the registry
    // first source is a regular source and the second is a source collection
    isSourceCollection.mockReturnValueOnce(false).mockReturnValueOnce(true);

    sourcesAreValid(sources);
    expect(validateSourceRegistry).toHaveBeenCalledTimes(3);
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
  test('creates a fetch queue with for a source collection', () => {
    isSourceCollection.mockReturnValue(false);
    const result = getFetchQueue(REGISTRY.sources);
    expect(result.length).toBe(REGISTRY.sources.length);
    expect(result[0].sources.length).toBe(1);
  });

  test('creates a fetch queue with for a curated collection', () => {
    isSourceCollection.mockReturnValue(true);
    const result2 = getFetchQueue(REGISTRY_WITH_COLLECTION.sources);
    expect(result2.length).toBe(REGISTRY_WITH_COLLECTION.sources.length);
    expect(result2[0].sources.length).toBe(
      REGISTRY_WITH_COLLECTION.sources[0].sourceProperties.sources.length,
    );
  });

  test('getFetchQueue passes the correct collection type', () => {
    isSourceCollection.mockReturnValue(false);
    const result = getFetchQueue(REGISTRY.sources);
    expect(result[0].type).toBe(COLLECTION_TYPES.github);

    isSourceCollection.mockReturnValue(true);
    const result2 = getFetchQueue(REGISTRY_WITH_COLLECTION.sources);
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

    const collection = await processCollection(
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
});
