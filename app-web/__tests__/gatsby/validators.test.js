import {
  isMarkdownRemark,
  isDevhubCollection,
  isDevhubSiphon,
  isEventbriteEvents,
  isGithubRaw,
  isMeetupEvent,
  isMarkdownRemarkFrontmatter,
  isRegistryJson,
} from '../../gatsby/utils/validators';

describe('Validators', () => {
  // factory to stub out nodes
  const node = type => ({ internal: { type } });
  describe('Node Type Validators', () => {
    test('they return true when valid', () => {
      expect(isMarkdownRemark(node('MarkdownRemark'))).toBe(true);
      expect(isMarkdownRemark(node('MarkdownRemark2'))).toBe(false);

      expect(isDevhubCollection(node('DevhubCollection'))).toBe(true);
      expect(isDevhubCollection(node('DevhubCollection2'))).toBe(false);

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

      expect(isRegistryJson(node('RegistryJson'))).toBe(true);
      expect(isRegistryJson(node('RegistryJson2'))).toBe(false);
    });
  });
});
