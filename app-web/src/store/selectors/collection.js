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
import { resourcesSelector } from './main';
import { getResources } from '../reducers/resources';
import { RESOURCE_TYPES } from '../../constants/ui';
import groupBy from 'lodash/groupBy';

export const selectCollections = createSelector(
  resourcesSelector,
  resources => getResources(resources.collections),
);

// maps all resources tied to a collection
export const selectCollectionsWithResources = createSelector(
  [selectCollections, resourcesSelector],
  (collections, resourcesState) =>
    collections.map(collection => ({
      ...collection,
      resources: collection.resources.map(resource => {
        // collections are initialized with resources only having { id: '...' }
        // this maps the entire resource object to the collection
        return { ...resourcesState.resources.byId[resource.id] };
      }),
    })),
);

// maps all resources tied to a collection
export const selectCollectionsWithAvailableResources = createSelector(
  [selectCollections, resourcesSelector],
  (collections, resourcesState) =>
    collections.map(collection => {
      return {
        ...collection,
        resources: collection.resources
          .map(resource => {
            // collections are initialized with resources only having { id: '...' }
            // this maps the entire resource object to the collection
            const foundResource = Object.prototype.hasOwnProperty.call(
              resourcesState.availableResources.byId,
              resource.id,
            );
            if (foundResource) {
              return { ...resourcesState.availableResources.byId[resource.id] };
            } else {
              return null;
            }
          })
          .filter(resource => resource !== null),
      };
    }),
);

/**
 * groups resources in a collection by type
 */
export const selectCollectionsWithResourcesGroupedByType = createSelector(
  selectCollectionsWithResources,
  collectionsWithResources =>
    collectionsWithResources.map(collection => {
      const defaultGroups = Object.keys(RESOURCE_TYPES).reduce((grouping, type) => {
        grouping[RESOURCE_TYPES[type]] = [];
        return grouping;
      }, {});
      // combine a set of default groups to the result of the groupby
      // so that all collections have all resource type groups
      const groups = { ...defaultGroups, ...groupBy(collection.resources, 'resource.type') };
      return {
        ...collection,
        resources: groups,
        hasResources: !Object.keys(groups).every(group => groups[group].length === 0),
      };
    }),
);

/**
 * groups resources in a collection by type but for only resouorces in the available resources
 * these groupings are affects by search
 */
export const selectCollectionsWithAvailableResourcesGroupedByType = createSelector(
  selectCollectionsWithAvailableResources,
  collectionsWithResources =>
    collectionsWithResources.map(collection => {
      const defaultGroups = Object.keys(RESOURCE_TYPES).reduce((grouping, type) => {
        grouping[RESOURCE_TYPES[type]] = [];
        return grouping;
      }, {});
      const groups = { ...defaultGroups, ...groupBy(collection.resources, 'resource.type') };

      return {
        ...collection,
        resources: groups,
        hasResources: !Object.keys(groups).every(group => groups[group].length === 0),
      };
    }),
);
