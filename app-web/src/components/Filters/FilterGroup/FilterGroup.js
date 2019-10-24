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
import queryString from 'query-string';
import { FormGroup, Label } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';
import { ARIA_LABEL_FILTER_RESOURCE } from '../../../constants/ariaLabels';
import Checkbox from '../../UI/Input/Checkbox';
import withLocation from '../../../hoc/withLocation';
import { navigate } from 'gatsby';
import { FILTER_QUERY_PARAM } from '../../../constants/filterGroups';

export const handleNavigatingByFilter = (location, currentFilters, filter, action) => {
  let filtersForURL = Object.keys(currentFilters).map(key => currentFilters[key]);

  if (action === 'add') {
    filtersForURL = filtersForURL.concat(filter);
  } else {
    filtersForURL = filtersForURL.filter(f => f !== filter);
  }

  const queryParam = queryString.parse(location.search);

  if (filtersForURL.length > 0) {
    queryParam[FILTER_QUERY_PARAM] = filtersForURL;
  } else {
    // if there are no filters for the url delete the property
    delete queryParam[FILTER_QUERY_PARAM];
  }
  // stringify takes the queryParam object and serializes it into a search string
  // any props that are of type array become duplicated
  // { f: [1, 2, 3]} => ?f=1&f=2&f=3
  const query = isEmpty(queryParam) ? '' : `?${queryString.stringify(queryParam)}`;

  navigate(`${location.pathname}${query}`);
};

export const TEST_IDS = {
  title: 'filter-group-title',
  checkbox: 'filter-group-checkbox',
};

/**
 * Filter Group Component
 * renders checkboxes around a common theme ('group')
 * @param {Object} props
 * @param {String} props.title the title of the group
 * @param {Array} props.filters the filters which are used to render the checkboxes
 * @param {Object} props.location the reach router location object, this is provided typically by the with location
 * prop
 */
export const FilterGroup = ({ title, filters, location }) => {
  const queryParam = queryString.parse(location.search);
  let windowHasFilters = Object.prototype.hasOwnProperty.call(queryParam, FILTER_QUERY_PARAM);
  let urlFilters = [];

  if (windowHasFilters) {
    let filterQueryParams = decodeURIComponent(queryParam[FILTER_QUERY_PARAM]).split(',');
    // make sure filters are treated as an arraxy
    // if only one filter is passed as param ?f= it will be a string
    urlFilters = filterQueryParams;
  }
  // map urlFilters into an object based on key
  const urlFiltersIndex = urlFilters.reduce((map, filter) => {
    // attempt to decode string
    map[filter] = filter;
    return map;
  }, {});

  return (
    <FormGroup>
      <Label
        for={title}
        style={{
          fontWeight: '600',
          color: '#494949',
          fontSize: '14px',
          marginBottom: '0',
        }}
        data-testid={`${TEST_IDS.title}-${title}`}
      >
        {title}
      </Label>
      {filters.map((filter, ind) => {
        const active = urlFiltersIndex[filter.key] !== void 0;
        // appling a dynamic prop so that we don't end up with disabled='' as an attribute
        const disabledProp = filter.isFilterable ? {} : { disabled: true };
        /* 
          a requirement for custom reactstrap inputs is that the id of the custom input is
          an incremenet of a top level labels
          for attribute 
        */
        return (
          <Checkbox
            id={title + ind}
            key={filter.key}
            data-testid={`${TEST_IDS.checkbox}-${filter.key}`}
            aria-label={ARIA_LABEL_FILTER_RESOURCE}
            onChange={e =>
              active
                ? handleNavigatingByFilter(location, urlFiltersIndex, filter.key, 'remove')
                : handleNavigatingByFilter(location, urlFiltersIndex, filter.key, 'add')
            }
            name={filter.filterBy}
            label={filter.text}
            checked={active}
            {...disabledProp}
          />
        );
      })}
    </FormGroup>
  );
};

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      filterBy: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  location: PropTypes.object,
};

export default withLocation(FilterGroup)();
