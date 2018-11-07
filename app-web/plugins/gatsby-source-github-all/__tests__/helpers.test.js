import { createPathWithDigest } from '../utils/helpers';
describe('createPathWithDigest', () => {
  it('throws if base is not a string', () => {
    expect(() => createPathWithDigest(9, '123')).toThrow('base must be a string');
  });

  it('throws if digestable is not a string', () => {
    expect(() => createPathWithDigest('path', 123)).toThrow('digestable must be a string');
  });

  it('returns a normalized path', () => {
    expect(createPathWithDigest('/path/', 'readme.md')).toBe('/path/readme.md');
    expect(createPathWithDigest('path/', 'readme.md')).toBe('/path/readme.md');
    expect(createPathWithDigest('path', 'readme.md')).toBe('/path/readme.md');
  });
});
