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
import { Flag } from 'flag';
import Link from '../../UI/Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Ribbon from './Ribbon';
import shortid from 'shortid';

const ActionsRibbon = ({ actions, repository, owner }) => {
  let actionsRibbon;
  if (!repository || !owner) {
    actionsRibbon = null;
  } else {
    actionsRibbon = actions.map(config => {
      const link = config.getHref(repository, owner);

      return (
        <Flag key={shortid.generate()} name={config.flag}>
          <li>
            <Link to={link} aria-label={config.ariaLabel}>
              <FontAwesomeIcon icon={config.icon} />
            </Link>
          </li>
        </Flag>
      );
    });
  }
  return <Ribbon>{actionsRibbon}</Ribbon>;
};

ActionsRibbon.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      getHref: PropTypes.func.isRequired,
      icon: PropTypes.node.isRequired,
      ariaLabel: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired, // this is the dot prop path to the feature flag state reducer
      name: PropTypes.string,
    }).isRequired,
  ),
  repository: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default ActionsRibbon;
