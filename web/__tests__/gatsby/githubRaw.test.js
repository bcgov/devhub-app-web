import { reduceJourneyRegistryToTopic } from '../../gatsby/utils/githubRaw';
import { JOURNEY_REGISTRY, JOURNEY_REGISTRY_MAPPED_AS_TOPIC } from '../../__fixtures__/registry';

describe('githubRaw helpers', () => {
  describe('Reducing Journey Registry to a Topic Registry', () => {
    it('can reduce a journey into a topic', () => {
      expect(reduceJourneyRegistryToTopic(JOURNEY_REGISTRY)).toEqual(
        JOURNEY_REGISTRY_MAPPED_AS_TOPIC,
      );
    });
  });
});
