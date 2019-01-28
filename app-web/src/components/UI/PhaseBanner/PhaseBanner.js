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
import styles from './PhaseBanner.module.css';

// produces a label for the application status...alpha, beta etc
const PhaseBanner = ({ phase }) => {
  const classNames = [styles.PhaseBanner];
  // eslint-disable-next-line default-case
  switch (phase.toLowerCase()) {
    case 'alpha':
      classNames.push(styles.Alpha);
      break;
    case 'beta':
      classNames.push(styles.Beta);
      break;
  }
  return (
    <div
      aria-label={`This application is currently in ${phase} phase`}
      className={classNames.join(' ')}
    >
      {phase}
    </div>
  );
};

PhaseBanner.propTypes = {
  phase: PropTypes.string,
};

PhaseBanner.defaultProps = {
  phase: 'Beta',
};

export default PhaseBanner;
