import { createPathWithDigest, getClosestResourceType } from '../utils/helpers';
jest.unmock('@bcgov/common-web-utils');
jest.unmock('shorthash');
jest.unmock('string-similarity');

const shorthash = require('shorthash');

describe('createPathWithDigest Integration Tests', () => {
  it('return path is idempotent', () => {
    const digestable = 'readme.md';
    const hash = shorthash.unique(digestable);

    expect(createPathWithDigest('/path/', digestable)).toBe(`/path/${hash}`);

    expect(createPathWithDigest('path/', digestable)).toBe(
      createPathWithDigest('path/', digestable),
    );
  });
});

describe('getClosestResourceType', () => {
  it('returns the closest resource type when matched', () => {
    expect(getClosestResourceType('documentation')).toBe('Documentation');
    expect(getClosestResourceType('docmentatun')).toBe('Documentation');
    expect(getClosestResourceType('Description')).toBe('');
    expect(getClosestResourceType('adsfasdfkj')).toBe('');
  });
});
