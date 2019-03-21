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
import { createSelector } from 'reselect';
import { getResources, filterResources } from '../reducers/resources';
import { RESOURCE_TYPES } from '../../constants/ui';
import { resourcesSelector } from './main';
import groupBy from 'lodash/groupBy';

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
    const defaultGroups = Object.keys(RESOURCE_TYPES).reduce((grouping, type) => {
      grouping[RESOURCE_TYPES[type]] = [];
      return grouping;
    }, {});
    // reminder to replace this hardcoded string to the getter method
    // for the siphon node interface when that is developed!
    // usage should be like Siphon.getPathToResourceType();
    const resourceTypeProp = 'resource.type';
    return { ...defaultGroups, ...groupBy(availableResources, resourceTypeProp) };
  },
);

// search selectors
export const selectQuery = createSelector(
  resourcesSelector,
  resources => resources.query,
);

export const selectSearchResultsLength = createSelector(
  [resourcesSelector, selectAvailableResources],
  (resources, availableResources) => {
    let startCount = Object.keys(resources.searchResults).length;
    if (resources.resourceType !== null) {
      const difference = availableResources.filter(r => r.resource.type !== resources.resourceType)
        .length;
      startCount -= difference;
    }
    return startCount;
  },
);

// similar as above
export const selectTotalResources = createSelector(
  resourcesSelector,
  resources => resources.resources.allIds.length,
);

export const selectResourcesReducerLoading = createSelector(
  resourcesSelector,
  resources => resources.loading,
);

export const selectSearchResultsExist = createSelector(
  [selectSearchResultsLength, selectQuery],
  (searchResultsLength, query) => {
    return searchResultsLength > 0 && query.length > 0;
  },
);

export const selectResourcesExistByType = createSelector(
  selectResources,
  resources => {
    const resourceTypeProp = 'resource.type';
    const groupedResultsByType = groupBy(resources, resourceTypeProp);
    // map over grouped results and return true/false if results exist
    return Object.keys(groupedResultsByType).reduce((resultsByType, type) => {
      // get results from grouping
      const results = groupedResultsByType[type];
      resultsByType[type] = results.length > 0;
      // results for this type exist if either there are results or
      return resultsByType;
    }, {});
  },
);
