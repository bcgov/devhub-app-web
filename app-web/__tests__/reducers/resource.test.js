/*
Copyright 2018 Province of British Columbia

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
import reducer, { applyPropsToFilterByResourceCount } from '../../src/store/reducers/resources';
import defaultFilters from '../../src/constants/filterGroups';
import * as actions from '../../src/store/actions';
import {
  SIPHON_NODES_MAP,
  SIPHON_NODES,
  COLLECTIONS_MAP,
  COLLECTIONS,
} from '../../__fixtures__/siphon-fixtures';
import { LUNR_SEARCH_RESULTS_2 } from '../../__fixtures__/lunr';
import { RESOURCE_TYPES } from '../../src/constants/ui';

describe('resources reducer', () => {
  const initialState = {
    resources: {
      byId: {},
      allIds: [],
    },
    collections: {
      byId: {},
      allIds: [],
    },
    availableResources: {
      byId: {},
      allIds: [],
    },
    resourcesLoaded: false,
    resourceType: null,
    query: null,
    searchResults: {},
    loading: false,
    error: false,
    messages: [],
    filters: defaultFilters,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle loading resources', () => {
    const resources = {
      byId: SIPHON_NODES_MAP.map,
      allIds: SIPHON_NODES_MAP.all,
    };
    const availableResources = {
      byId: SIPHON_NODES_MAP.map,
      allIds: SIPHON_NODES_MAP.all,
    };

    const collections = {
      byId: COLLECTIONS_MAP.map,
      allIds: COLLECTIONS_MAP.all,
    };

    const newState = reducer(initialState, actions.loadResources(SIPHON_NODES, COLLECTIONS));
    expect(newState.resources).toEqual(resources);
    expect(newState.availableResources).toEqual(availableResources);
    expect(newState.collections).toEqual(collections);
  });

  it('should set resourcesLoaded to true when resource are loaded', () => {
    const newState = reducer(initialState, actions.loadResources(SIPHON_NODES, COLLECTIONS));
    expect(newState.resourcesLoaded).toBe(true);
  });

  it('should set filters to filterable when resources are loaded', () => {
    const state = {
      ...initialState,
      filters: defaultFilters.map(f => ({ ...f, isFilterable: false })),
    };

    const newState = reducer(state, actions.loadResources(SIPHON_NODES, COLLECTIONS));

    expect(newState.filters.every(f => f.isFilterable)).toBe(true);
  });

  it('should set filter to active when added and if there are available nodes', () => {
    // add some nodes to the initial state
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
    };
    // assert all filters are inactive at first
    expect(state.filters.every(f => !f.active)).toBe(true);
    const newState = reducer(state, actions.addFilter(defaultFilters[0].key));
    // find the filter by the key that was passed into action creator
    const filter = newState.filters.find(f => f.key === defaultFilters[0].key);
    expect(filter.active).toBe(true);
  });

  it('should set filter to inactivev when removed', () => {
    // add some nodes to the initial state
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      filters: defaultFilters.map((filter, index) =>
        index === 0 ? { ...filter, active: true } : filter,
      ),
    };
    // assert first filter is preset to true
    expect(state.filters[0].active).toBe(true);
    const newState = reducer(state, actions.removeFilter(defaultFilters[0].key));
    // find the filter by the key that was passed into action creator
    const filter = newState.filters.find(f => f.key === defaultFilters[0].key);
    expect(filter.active).toBe(false);
  });

  it('should set search results whenb search results are set', () => {
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
    };
    const newState = reducer(state, actions.setSearchResults(LUNR_SEARCH_RESULTS_2));

    expect(newState.searchResults).toEqual(LUNR_SEARCH_RESULTS_2);
  });

  it('should set available resource when search results are set', () => {
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
    };
    const newState = reducer(state, actions.setSearchResults(LUNR_SEARCH_RESULTS_2));

    // available resources should have changed
    const newById = Object.keys(LUNR_SEARCH_RESULTS_2).reduce((obj, id) => {
      obj[id] = SIPHON_NODES_MAP.map[id];
      return obj;
    }, {});
    const newAllIds = Object.keys(newById);
    // should only find objects from the search results fixture
    expect(newState.availableResources.byId).toEqual(newById);
    expect(newState.availableResources.allIds).toEqual(newAllIds);
  });

  it('should set search loading to false when search results are set', () => {
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
    };
    const newState = reducer(state, actions.setSearchResults(LUNR_SEARCH_RESULTS_2));

    expect(newState.loading).toBe(false);
  });

  it("should set filters isFilterable value to false when search results are set and filter doesn't exist in available resources", () => {
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
    };
    // assert all filters isFilterable is true by default
    expect(state.filters.every(f => f.isFilterable));
    const newState = reducer(state, actions.setSearchResults(LUNR_SEARCH_RESULTS_2));
    expect(newState.filters.every(f => f.isFilterable)).toBe(false);
  });

  it('correctly sets available resources count', () => {
    const personaFilter = defaultFilters[0];

    const newFilter = applyPropsToFilterByResourceCount(personaFilter, SIPHON_NODES);

    // manually reduce the amount of available resources within the siphon nodes
    const availableResources = SIPHON_NODES.reduce((acc, node) => {
      return acc + node.attributes.personas.some(p => p === personaFilter.value);
    }, 0);

    expect(newFilter.availableResources).toBe(availableResources);
  });

  it('correctly sets isFilterable if count > 0', () => {
    const personaFilter = { ...defaultFilters[0], isFilterable: false };
    const newFilter = applyPropsToFilterByResourceCount(personaFilter, SIPHON_NODES);
    expect(newFilter.isFilterable).toBe(true);
  });

  it('ignores nodes of the incorrect resource type', () => {
    const personaFilter = { ...defaultFilters[0] };
    const newFilter = applyPropsToFilterByResourceCount(personaFilter, SIPHON_NODES);
    const differentFilter = applyPropsToFilterByResourceCount(
      personaFilter,
      SIPHON_NODES,
      RESOURCE_TYPES.DOCUMENTATION, // only count nodes that have this type
    );

    // we'd expect the available count to be less
    expect(newFilter.availableResources).toBeGreaterThan(differentFilter.availableResources);
  });

  it('set active to false if count === 0', () => {
    const productOwnerFilter = { ...defaultFilters[2] };
    // in our fixtured nodes, there are zero nodes that have the product owner persona
    const newFilter = applyPropsToFilterByResourceCount(productOwnerFilter, SIPHON_NODES);
    expect(newFilter.active).toBe(false);
  });

  it('sets query', () => {
    const newState = reducer(initialState, actions.setSearchQuery('foo'));
    expect(newState.query).toBe('foo');
    expect(newState.loading).toBe(true);
  });

  it('resets all filters', () => {
    const state = {
      ...initialState,
      filters: initialState.filters.map(f => ({ ...f, active: true })),
    };

    const newState = reducer(state, actions.removeAllFilters());

    expect(newState.filters.every(f => !f.active)).toBe(true);
  });

  it('sets loading to false when reset search is called', () => {
    const state = {
      ...initialState,
      loading: true,
    };

    const newState = reducer(state, actions.resetSearch());

    expect(newState.loading).toBe(false);
  });

  it('sets available resources to resources when reset search is called', () => {
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: {
          foo: 'bar',
        },
        allIds: ['foo'],
      },
    };

    const newState = reducer(state, actions.resetSearch());
    expect(newState.availableResources).toEqual(state.resources);
  });

  it('sets available resources to resources when reset search is called', () => {
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      availableResources: {
        byId: {
          foo: 'bar',
        },
        allIds: ['foo'],
      },
    };

    const newState = reducer(state, actions.resetSearch());
    expect(newState.availableResources).toEqual(state.resources);
  });

  it('sets filters is filterable when reset search is called', () => {
    const state = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
      filters: defaultFilters.map(f => ({ ...f, isFilterable: false })),
    };

    const newState = reducer(state, actions.resetSearch());
    expect(newState.filters.every(f => f.isFilterable)).toBe(true);
  });

  it('sets resource type to null when a falsey value or null is passed in', () => {
    const newState = reducer(initialState, actions.setResourceType(''));
    expect(newState.resourceType).toBe(null);
  });

  it('sets resource type when a resource type is passed in', () => {
    const newState = reducer(initialState, actions.setResourceType(RESOURCE_TYPES.COLLECTIONS));
    expect(newState.resourceType).toBe(RESOURCE_TYPES.COLLECTIONS);
  });
});
