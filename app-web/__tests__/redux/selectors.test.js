/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/

// reselect selector unit tests
import { STATE } from '../../__fixtures__/redux-fixtures';
import groupBy from 'lodash/groupBy';
import defaultFilters from '../../src/constants/filterGroups';
import {
  FILTERED_NODES,
  SIPHON_NODES,
  SIPHON_NODES_MAP,
  COLLECTIONS,
  COLLECTIONS_MAP,
  DEFAULT_GROUPINGS,
} from '../../__fixtures__/siphon-fixtures';
import * as selectors from '../../src/store/selectors';
import { RESOURCE_TYPES } from '../../src/constants/ui';
describe('Reselect Selectors', () => {
  const state = {
    ...STATE,
    history: {
      location: {
        path: '/',
      },
    },
    resources: {
      collections: {
        byId: COLLECTIONS_MAP.map,
        allIds: COLLECTIONS_MAP.all,
      },
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: {
          '1': SIPHON_NODES_MAP.map['1'],
        },
        allIds: ['1'],
      },
      resourceType: null,
      resourcesLoaded: false,
      query: null,
      searchBarTerms: '',
      searchResults: {
        '1': { id: '1' },
      },
      loading: false,
      error: false,
      messages: [],
      filters: defaultFilters,
    },
  };

  it('returns the siphon state', () => {
    expect(selectors.resourcesSelector(state)).toEqual(state.resources);
  });

  it('returns a list of resources', () => {
    expect(selectors.selectResources(state)).toEqual(SIPHON_NODES);
  });

  it('returns a list of filters', () => {
    expect(selectors.selectFilters(state)).toEqual(state.resources.filters);
  });

  it('returns active filters', () => {
    const activeFilters = state.resources.filters.filter(f => f.active);
    expect(selectors.selectActiveFilters(state)).toEqual(activeFilters);
  });

  it('returns resources loaded', () => {
    expect(selectors.selectResourcesLoaded(state)).toEqual(state.resources.resourcesLoaded);
  });

  // it('returns collections sorted', () => {
  //   expect(selectors.selectSortedCollections(state)).toEqual(SORTED_COLLECTIONS);
  // });
  it('returns all resources when there is no search query ', () => {
    // const resources = [state.resources.availableResources.byId[1]];
    const resources = state.resources.resources.allIds.map(
      id => state.resources.resources.byId[id],
    );
    expect(selectors.selectAvailableResources(state)).toEqual(resources);
  });

  it('returns all available resources when there is a search query ', () => {
    // const resources = [state.resources.availableResources.byId[1]];
    const id = state.resources.availableResources.allIds[0];
    const stateWithSearch = {
      ...state,
      resources: {
        ...state.resources,
        query: 'foo',
        searchResults: {
          [id]: 1,
        },
      },
    };
    const resources = [state.resources.availableResources.byId[id]];
    expect(selectors.selectAvailableResources(stateWithSearch)).toEqual(resources);
  });

  // it('returns all available resources when there are no active filters', () => {
  //   expect(selectors.selectAvailableResources(state)).toEqual();
  // });

  it('returns filtered available resources when there are active filters', () => {
    // set up filters so that designer filter is active
    const stateWithActiveFilter = {
      ...state,
      resources: {
        ...state.resources,
        filters: defaultFilters.map(filter =>
          filter.value === 'Designer' ? { ...filter, active: true } : filter,
        ),
      },
    };
    expect(selectors.selectFilteredAvailableResources(stateWithActiveFilter)).toEqual(
      FILTERED_NODES,
    );
  });

  it('groups available resources by their resource type', () => {
    const defaultGroupings = Object.keys(RESOURCE_TYPES).reduce((obj, type) => {
      obj[RESOURCE_TYPES[type]] = [];
      return obj;
    }, {});

    const groupedResources = groupBy(SIPHON_NODES, 'resource.type');
    expect(selectors.selectGroupedFilteredAvailableResources(state)).toEqual({
      ...defaultGroupings,
      ...groupedResources,
    });
  });

  it('returns the query', () => {
    expect(selectors.selectQuery(state)).toEqual(state.resources.query);
  });

  it('returns the search results length', () => {
    expect(selectors.selectSearchResultsLength(state)).toEqual(
      Object.keys(state.resources.searchResults).length,
    );
  });

  it('returns the search results length for a set resource type', () => {
    const stateWithResourceType = {
      ...state,
      resources: { ...state.resources, resourceType: RESOURCE_TYPES.DOCUMENTATION },
    };
    expect(selectors.selectSearchResultsLength(stateWithResourceType)).toBeLessThan(
      Object.keys(state.resources.searchResults).length,
    );
  });

  it('returns the total resource', () => {
    expect(selectors.selectTotalResources(state)).toEqual(SIPHON_NODES.length);
  });

  it('returns siphons loading indicator', () => {
    expect(selectors.selectResourcesReducerLoading(state)).toEqual(state.resources.loading);
  });

  it('returns collections', () => {
    expect(selectors.selectCollections(state)).toEqual(COLLECTIONS);
  });

  it('returns collections with resources', () => {
    const collectionsWithResources = selectors.selectCollectionsWithResources(state);
    const collection1Nodes = SIPHON_NODES.filter(
      node => node.parent.id === collectionsWithResources[0].id,
    );
    // we'd expect collections to have resources instead of ids
    expect(collectionsWithResources[0].resources).toEqual(collection1Nodes);
  });

  it('returns collections with resources grouped by type', () => {
    const collectionWithGroupedResources = selectors.selectCollectionsWithResourcesGroupedByType(
      state,
    );

    const collection1Nodes = groupBy(
      SIPHON_NODES.filter(node => node.parent.id === collectionWithGroupedResources[0].id),
      'resource.type',
    );
    expect(collectionWithGroupedResources[0].resources).toEqual({
      ...DEFAULT_GROUPINGS,
      ...collection1Nodes,
    });
  });
});
