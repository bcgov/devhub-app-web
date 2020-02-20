import {
  isMarkdownRemark,
  isDevhubSiphon,
  isEventbriteEvents,
  isGithubRaw,
  isMeetupEvent,
  isMarkdownRemarkFrontmatter,
  isTopicRegistryJson,
  verifyJourney,
  createSlugBlacklist,
  isInBlackList,
} from '../../gatsby/utils/validators';

describe('Validators', () => {
  describe('Slug Validation', () => {
    test('createSlugBlacklist', () => {
      expect(createSlugBlacklist()).toMatchSnapshot();
    });

    test('isInBlackList', () => {
      const blacklist = {
        foo: 'foo',
        bar: 'bar',
      };
      expect(isInBlackList(blacklist, 'foo')).toBe(true);
      expect(isInBlackList(blacklist, 'foo ')).toBe(true);
      expect(isInBlackList(blacklist, 'FOO')).toBe(true);
      expect(isInBlackList(blacklist, 'FOO ')).toBe(true);
      expect(isInBlackList(blacklist, 'baz ')).toBe(false);
    });
  });
  // factory to stub out nodes
  const node = type => ({ internal: { type } });
  describe('Node Type Validators', () => {
    test('they return true when valid', () => {
      expect(isMarkdownRemark(node('MarkdownRemark'))).toBe(true);
      expect(isMarkdownRemark(node('MarkdownRemark2'))).toBe(false);

      expect(isDevhubSiphon(node('DevhubSiphon'))).toBe(true);
      expect(isDevhubSiphon(node('DevhubSiphon2'))).toBe(false);

      expect(isEventbriteEvents(node('EventbriteEvents'))).toBe(true);
      expect(isEventbriteEvents(node('EventbriteEvents2'))).toBe(false);

      expect(isMeetupEvent(node('MeetupEvent'))).toBe(true);
      expect(isMeetupEvent(node('MeetupEvent2'))).toBe(false);

      expect(isGithubRaw(node('GithubRaw'))).toBe(true);
      expect(isGithubRaw(node('GithubRaw2'))).toBe(false);

      expect(isMarkdownRemarkFrontmatter(node('MarkdownRemarkFrontmatter'))).toBe(true);
      expect(isMarkdownRemarkFrontmatter(node('MarkdownRemarkFrontmatter2'))).toBe(false);

      expect(isTopicRegistryJson(node('TopicRegistryJson'))).toBe(true);
      expect(isTopicRegistryJson(node('RegistryJson2'))).toBe(false);
    });
  });

  describe('Validating a journey', () => {
    it('throws if github.sourceProperties.files param is used', () => {
      const invalidJourney1 = {
        name: 'foo',
        sourceProperties: {
          stops: [
            {
              sourceType: 'github',
              sourceProperties: {
                files: ['oops'],
              },
            },
          ],
        },
      };

      const validJourney1 = {
        name: 'foo',
        sourceProperties: {
          stops: [
            {
              sourceType: 'github',
              sourceProperties: {
                file: 'hello',
              },
              stops: [
                {
                  sourceType: 'github',
                  sourceProperties: {
                    files: ['foo'],
                  },
                },
              ],
            },
          ],
        },
      };

      const validJourney2 = {
        name: 'foo',
        sourceProperties: {
          stops: [
            {
              sourceType: 'github',
              sourceProperties: {
                file: 'hello',
              },
              stops: [
                {
                  sourceType: 'github',
                  sourceProperties: {
                    file: 'foo',
                  },
                },
              ],
            },
          ],
        },
      };
      expect(() => verifyJourney(invalidJourney1)).toThrow();
      expect(() => verifyJourney(validJourney1)).not.toThrow();
      expect(() => verifyJourney(validJourney2)).not.toThrow();
    });
  });
});
