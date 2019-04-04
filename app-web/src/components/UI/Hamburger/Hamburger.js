import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ARIA_LABEL_FILTER_SELECT } from '../../../constants/ariaLabels';

export const TEST_IDS = {
  hamburger: 'hamburger-icon-button',
};

const Hamburger = ({ clicked, ...rest }) => (
  <FontAwesomeIcon
    {...rest}
    icon={faBars}
    onClick={clicked}
    data-testid={TEST_IDS.hamburger}
    size="2x"
    aria-label={ARIA_LABEL_FILTER_SELECT}
  />
);

Hamburger.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Hamburger;
