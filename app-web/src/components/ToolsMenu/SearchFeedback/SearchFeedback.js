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
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const SearchFeedback = ({ searchCount, totalNodeCount }) => {
  let caption = null;
  const path = `/?q=`;

  if (searchCount === 0) {
    caption = (
      <p>
        No resources found :( Click <Link to={path}>here</Link> to reset or otherwise try searching
        again.
      </p>
    );
  } else if (searchCount < totalNodeCount) {
    caption = (
      <p>
        Click <Link to={path}>here</Link> to reset search.
      </p>
    );
  }

  return <div>{caption}</div>;
};

SearchFeedback.propTypes = {
  searchCount: PropTypes.number.isRequired,
  totalNodeCount: PropTypes.number.isRequired,
};

export default SearchFeedback;
