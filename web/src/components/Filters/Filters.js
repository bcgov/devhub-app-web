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
import React from 'react';
import PropTypes from 'prop-types';
import FilterGroup from './FilterGroup/FilterGroup';
import groupBy from 'lodash/groupBy';

const Filters = ({ filters }) => {
  // group filter groups by there title
  let groupedFilters = groupBy(filters, 'title');

  groupedFilters = Object.keys(groupedFilters).map(title => ({
    title: title,
    filters: groupedFilters[title],
  }));

  const filterGroupsComponent = (
    <div>
      {groupedFilters.map(fg => (
        <FilterGroup {...fg} key={`filters-${fg.key}`} />
      ))}
    </div>
  );

  return filterGroupsComponent;
};

Filters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Filters;
