import groupBy from 'lodash/groupBy';
import {
  selectTopicsWithResourcesGroupedByType,
  selectResourcesGroupedByType,
} from '../../src/utils/selectors';
import { RESOURCE_TYPES } from '../../src/constants/ui';
import { SIPHON_NODES, TOPICS } from '../../__fixtures__/siphon-fixtures';

const defaultGroupings = Object.keys(RESOURCE_TYPES).reduce((obj, type) => {
  obj[RESOURCE_TYPES[type]] = [];
  return obj;
}, {});

describe('General Purpose Selectors', () => {
  it('selects resources grouped by type', () => {
    const selector = selectResourcesGroupedByType();
    const groupedResources = groupBy(SIPHON_NODES, 'resource.type');

    expect(selector(SIPHON_NODES)).toEqual({ ...defaultGroupings, ...groupedResources });
  });

  it('selects topics with resources (grouped by type) appeneded as a property', () => {
    const selector = selectTopicsWithResourcesGroupedByType();
    const topicWithGroupedResources = selector(TOPICS);
    const topic1Nodes = groupBy(
      // mapping to only have id, _metadata, resource as in the future, the graphql query for AllDevhubCollection
      // will be modified to query for childrenDevhubSiphon { id, _metadata, resouce }
      SIPHON_NODES.filter(node => node.parent.id === topicWithGroupedResources[0].id).map(n => ({
        id: n.id,
        _metadata: { ...n._metadata },
        resource: { ...n.resource },
        unfurl: { ...n.unfurl },
      })),
      'resource.type',
    );

    expect(topicWithGroupedResources[0].resources).toEqual({
      ...defaultGroupings,
      ...topic1Nodes,
    });
  });
});
