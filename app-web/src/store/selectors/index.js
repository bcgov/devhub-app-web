import { createSelector } from 'reselect';
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
    // reminder to replace this hardcoded string to the getter method
    // for the siphon node interface when that is developed!
    // usage should be like Siphon.getPathToResourceType();
    const resourceTypeProp = 'resource.type';
    return groupBy(availableResources, resourceTypeProp);
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
