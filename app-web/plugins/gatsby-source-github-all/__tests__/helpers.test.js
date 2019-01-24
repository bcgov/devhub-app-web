import {
  createPathWithDigest,
  createUnfurlObj,
  getClosestResourceType,
  unfurlWebURI,
  validateAgainstSchema,
  newCollection,
  getCollectionDescriptionBySourceType,
  assignPositionToCollection,
  assignPositionToResource,
  assignPositionToSource,
  createPosition,
  mergeUnfurls,
} from '../utils/helpers';
import { RESOURCE_TYPES } from '../utils/constants';

import { fetchRepo } from '../utils/sources/github/api';
jest.mock('../utils/sources/github/api');

describe('createPathWithDigest', () => {
  it('throws if base is not a string', () => {
    expect(() => createPathWithDigest(9, '123')).toThrow('base must be a string');
  });

  it('throws if digestables is not a string', () => {
    expect(() => createPathWithDigest('path', 123)).toThrow('digestable must be a string');
    expect(() => createPathWithDigest('path', '123', 123)).toThrow('digestable must be a string');
  });

  it('returns a normalized path', () => {
    expect(createPathWithDigest('/path/', 'readme.md')).toBe('/path/readme.md');
    expect(createPathWithDigest('path/', 'readme.md')).toBe('/path/readme.md');
    expect(createPathWithDigest('path', 'readme.md')).toBe('/path/readme.md');
    expect(createPathWithDigest('/path/', 'source', 'readme.md')).toBe('/path/sourcereadme.md');
    expect(createPathWithDigest('path/', 'source', 'readme.md')).toBe('/path/sourcereadme.md');
    expect(createPathWithDigest('path', 'source', 'readme.md')).toBe('/path/sourcereadme.md');
  });
});

describe('createUnfurlObj', () => {
  it('returns an object', () => {
    expect(createUnfurlObj('test', {})).toBeDefined();
  });

  it('throws if type is not a string', () => {
    expect(() => {
      createUnfurlObj(null, {});
    }).toThrow('type must be a string!');
  });
});

describe('getClosestResourceType', () => {
  it('returns an empty string if one is passed in', () => {
    expect(getClosestResourceType('')).toBe('');
  });

  it('returns the closest resource type when matched', () => {
    expect(getClosestResourceType(RESOURCE_TYPES[0])).toBe(RESOURCE_TYPES[0]);
  });
});

describe('unfurlWebURI', () => {
  it('returns a unfurl object', () => {
    const uri = 'https://example.com';
    expect(unfurlWebURI(uri)).toBeDefined();
  });

  it('throws if uri is invalid', async () => {
    try {
      await expect(unfurlWebURI());
    } catch (e) {
      expect(e).toEqual({
        error: 'The uri is not valid',
      });
    }
  });

  describe('getCollectionDescriptionBySourceType', () => {
    it('returns a string', async () => {
      const source = {
        sourceType: 'foo',
      };
      const result = await getCollectionDescriptionBySourceType(source);
      expect(typeof result).toBe('string');
    });

    it('returns fetches github repo description', async () => {
      fetchRepo.mockReturnValue(Promise.resolve({ description: 'matt damon' }));
      const source = {
        sourceType: 'github',
        sourceProperties: {
          repo: 'foo',
          owner: 'bar',
        },
      };

      const tokens = {
        GITHUB_API_TOKEN: 'foo',
      };

      const result = await getCollectionDescriptionBySourceType(source, tokens);
      expect(result).toBe('matt damon');
    });
  });

  describe('validateAgainstSchema', () => {
    let schema;
    beforeEach(() => {
      schema = {
        foo: {
          type: String,
          required: true,
        },
        bar: {
          type: String,
          required: false,
        },
      };
    });

    it('returns an object with a messages property that is an array', () => {
      const result = validateAgainstSchema({}, schema);
      expect(typeof result).toBe('object');
      expect(result.messages instanceof Array).toBe(true);
    });

    it('returns an object with an isValid property that is boolean', () => {
      const result = validateAgainstSchema({}, schema);
      expect(typeof result).toBe('object');
      expect(typeof result.isValid).toBe('boolean');
    });

    it('validates schema and returns true when valid', () => {
      const object = {
        foo: 'foo',
        bar: 'bar',
      };
      const result = validateAgainstSchema(object, schema);
      expect(result.isValid).toBe(true);
    });

    it('validates not required properties if passed in', () => {
      const object = {
        foo: 'foo',
        bar: 1, // bar is not required but sould be a string
      };
      const result = validateAgainstSchema(object, schema);
      expect(result.isValid).toBe(false);
      expect(result.messages.length).toBe(1);
    });

    it('validates required properties', () => {
      const object = {
        bar: 'foo',
      };
      const result = validateAgainstSchema(object, schema);
      expect(result.isValid).toBe(false);
      expect(result.messages.length).toBe(1);
    });
  });

  describe('newCollection', () => {
    it('it binds properties to a new collection object', () => {
      const collection = {
        name: 'foo',
        sources: [],
      };

      const props = {
        description: 'bar',
      };

      const updatedCollection = newCollection(collection, props);
      expect(updatedCollection).not.toBe(collection);
      expect(updatedCollection.description).toBe(props.description);
    });
  });

  describe('position helpers', () => {
    it('creates a position', () => {
      expect(createPosition(0)).toEqual([0]);
      expect(createPosition(0, [0, 0])).toEqual([0, 0, 0]);
    });

    it('assigns position to a collection', () => {
      const collection = {
        foo: 'bar',
      };
      const expected = {
        ...collection,
        metadata: {
          position: [0],
        },
      };

      expect(assignPositionToCollection(collection, 0)).toEqual(expected);
    });

    it('returns a cb when assignPositionToSource called', () => {
      expect(assignPositionToSource({}) instanceof Function).toBe(true);
    });

    it('returns a cb when assignPositionToResource called', () => {
      expect(assignPositionToResource({}) instanceof Function).toBe(true);
    });

    it('assigns position to source when called', () => {
      const cb = assignPositionToSource({ metadata: { position: [0] } });
      const source = {
        foo: 'bar',
      };

      const expected = {
        ...source,
        metadata: {
          position: [0, 0],
        },
      };

      expect(cb(source, 0)).toEqual(expected);
    });

    it('assigns position to resource when called', () => {
      const cb = assignPositionToResource({ metadata: { position: [0, 0] } });
      const resource = {
        foo: 'bar',
      };

      const expected = {
        ...resource,
        metadata: {
          position: [0, 0, 0],
        },
      };

      expect(cb(resource, 0)).toEqual(expected);
    });
  });
  describe('mergeUnfurls', () => {
    it('merges unfurls with old unfurls taking priority', () => {
      const oldUnfurl = createUnfurlObj('internal', {
        title: 'foo',
        description: 'blah',
        author: undefined,
        image: undefined,
      });

      const externalUnfurl = {
        title: 'bar',
        image: 'cool.png',
      };

      const expected = {
        title: 'foo',
        description: 'blah',
        image: 'cool.png',
        author: undefined,
        data1: undefined,
        data2: undefined,
        label1: undefined,
        label2: undefined,
        type: 'internal',
      };

      expect(mergeUnfurls(oldUnfurl, externalUnfurl)).toEqual(expected);
    });
  });
});
