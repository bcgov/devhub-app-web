import { createPathWithDigest } from '../utils/helpers';
jest.unmock('@bcgov/common-web-utils');
jest.unmock('shorthash');

const shorthash = require('shorthash');

describe('createPathWithDigest Integration Tests', () => {
  it('return path is idempotent', () => {
    const digestable = 'readme.md';
    const hash = shorthash.unique(digestable);

    expect(createPathWithDigest('/path/', digestable)).toBe(`/path/${hash}`);

    expect(createPathWithDigest('path/', digestable)).toBe(
      createPathWithDigest('path/', digestable)
    );
  });
});
