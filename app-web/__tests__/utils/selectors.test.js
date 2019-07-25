import groupBy from 'lodash/groupBy';
import {
  selectTopicsWithResourcesGroupedByType,
  selectResourcesGroupedByType,
} from '../../src/utils/selectors';
import { RESOURCE_TYPES } from '../../src/constants/ui';
import { SIPHON_NODES, TOPICS } from '../../__fixtures__/nodes';

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

    expect(topicWithGroupedResources).toMatchSnapshot();
  });
});
