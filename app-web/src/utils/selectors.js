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
export const selectTopics = topics => topics;
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
  createSelector(selectResources, resources => {
    return { ...defaultGroups, ...groupBy(resources, 'fields.resourceType') };
  });

/**
 * groups resources in a topic by type
 */
export const selectTopicsWithResourcesGroupedByType = () =>
  createSelector(selectTopics, topicsWithResources =>
    topicsWithResources.map(topic => {
      // combine a set of default groups to the result of the groupby
      // so that all topics have all resource type groups
      const selector = selectResourcesGroupedByType();

      const groups = selector(topic.connectsWith);
      return {
        ...topic,
        resources: groups,
        hasResources: !Object.keys(groups).every(group => groups[group].length === 0),
      };
    }),
  );
