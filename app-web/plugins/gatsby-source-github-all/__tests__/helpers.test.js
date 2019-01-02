import {
  createPathWithDigest,
  createUnfurlObj,
  getClosestResourceType,
  unfurlWebURI,
} from '../utils/helpers';
import { RESOURCE_TYPES } from '../utils/constants';

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
});
