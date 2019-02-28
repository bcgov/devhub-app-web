import { createSelector } from 'reselect';
import { filterCollections } from '../reducers/siphon';
import { getResources, filterResources } from '../reducers/resources';
import groupBy from 'lodash/groupBy';

export const resourcesSelector = state => state.resources;
export const historySelector = state => state.history;
export const uiSelector = state => state.ui;

export const selectResources = createSelector(
  resourcesSelector,
  resources => getResources(resources.resources),
);

export const selectFilters = createSelector(
  resourcesSelector,
  resources => resources.filters,
);

// returns all currently active filters
export const selectActiveFilters = createSelector(
  selectFilters,
  filters => filters.filter(f => f.active),
);

export const selectResourcesLoaded = createSelector(
  resourcesSelector,
  resources => resources.resourcesLoaded,
);

export const selectAvailableResources = createSelector(
  [resourcesSelector, selectResources],
  (resourcesState, resources) => {
    // when there is a valid search query
    if (resourcesState.query !== null) {
      return getResources(resourcesState.availableResources);
    } else {
      return resources;
    }
  },
);

export const selectFilteredAvailableResources = createSelector(
  [selectActiveFilters, selectAvailableResources],
  (activeFilters, availableResources) => {
    if (activeFilters.length === 0) return availableResources;
    return filterResources(availableResources, activeFilters);
  },
);

// groups resources by the resource type
export const selectGroupedFilteredAvailableResources = createSelector(
  selectFilteredAvailableResources,
  availableResources => {
    console.log(availableResources);
    const resourceTypeProp = 'resource.type';
    return groupBy(availableResources, resourceTypeProp);
  },
);
// returns collections where nodes are sorted lexographically by position
export const selectSortedCollections = createSelector(
  selectResources,
  collections =>
    collections.map(collection => ({
      ...collection,
      nodes: collection.nodes.sort((a, b) => {
        // lexographic sort of position string
        if (a._metadata.position < b._metadata.position) return -1;
        if (a._metadata.position > b._metadata.position) return 1;
        return 0;
      }),
    })),
);

// returns collections filtered
export const selectFilteredCollections = createSelector(
  [selectSortedCollections, selectActiveFilters],
  (collections, filters) => {
    let filteredCollections =
      filters.length > 0 ? filterCollections(collections, filters) : collections;
    return filteredCollections.map(filteredCollection => ({
      ...filteredCollection,
      // this the only data we need for nodes to render cards
      nodes: filteredCollection.nodes.map(node => ({
        title: node.unfurl.title,
        description: node.unfurl.description,
        image: node.unfurl.image,
        path: node.resource.path,
        type: node.resource.type,
      })),
    }));
  },
);

// search selectors
export const selectQuery = createSelector(
  resourcesSelector,
  resources => resources.query,
);

// used to dictate a feedback message after conducting a search check <SearchFeedback /> for reference
export const selectSearchResultsLength = createSelector(
  resourcesSelector,
  resources => Object.keys(resources.searchResults).length,
);

// similar as above
export const selectTotalResources = createSelector(
  resourcesSelector,
  resources => resources.resources.allIds.length,
);

// similar as above
export const selectSearchWordLength = createSelector(
  resourcesSelector,
  resources => resources.searchBarTerms.length,
);

export const selectResourcesReducerLoading = createSelector(
  resourcesSelector,
  resources => resources.loading,
);
