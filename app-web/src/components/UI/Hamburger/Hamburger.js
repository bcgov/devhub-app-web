import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ARIA_LABEL_FILTER_SELECT } from '../../../constants/ariaLabels';
const Hamburger = ({ clicked, ...rest }) => (
  <FontAwesomeIcon
    {...rest}
    icon={faBars}
    onClick={clicked}
    size="2x"
    aria-label={ARIA_LABEL_FILTER_SELECT}
  />
);

Hamburger.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Hamburger;
