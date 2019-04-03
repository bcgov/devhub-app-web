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
// these are general use selectors NOT tied to redux
// reselect is perfectly capable for general purpose memoization
import { createSelector } from 'reselect';
import { RESOURCE_TYPES } from '../constants/ui';
import groupBy from 'lodash/groupBy';

// the following to fns are essentially stubs, this mocks the behaviour of a created selector
export const selectCollections = collections => collections;
export const selectResources = resources => resources;

const defaultGroups = Object.keys(RESOURCE_TYPES).reduce((grouping, type) => {
  grouping[RESOURCE_TYPES[type]] = [];
  return grouping;
}, {});
/**
 * giving a list of resources
 * this selector memoizes and returns the resources grouped by resource.type
 * additionally if a set of resources is missing on of the standard 'resource types'
 * a default value is provided as [resourceType]: [] (empty array)
 */
export const selectResourcesGroupedByType = () =>
  createSelector(
    selectResources,
    resources => {
      return { ...defaultGroups, ...groupBy(resources, 'resource.type') };
    },
  );

/**
 * groups resources in a collection by type
 */
export const selectCollectionsWithResourcesGroupedByType = () =>
  createSelector(
    selectCollections,
    collectionsWithResources =>
      collectionsWithResources.map(collection => {
        // combine a set of default groups to the result of the groupby
        // so that all collections have all resource type groups
        const selector = selectResourcesGroupedByType();
        const groups = selector(collection.childrenDevhubSiphon);
        return {
          ...collection,
          resources: groups,
          hasResources: !Object.keys(groups).every(group => groups[group].length === 0),
        };
      }),
  );
