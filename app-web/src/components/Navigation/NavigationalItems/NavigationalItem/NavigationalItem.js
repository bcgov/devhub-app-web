import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import HexBlock from '../../../UI/Hexgrid/HexBlock/HexBlock';
import Aux from '../../../../hoc/auxillary';
import classes from './NavigationalItem.module.css';

const NavigationalItem = ({ icon, title, description, link }) => {
  let iconWrapper = null;
  //if theres an icon to pass in
  if (icon) {
    iconWrapper = (
      <span className={classes.Icon}>
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  }
  return (
    <Aux>
      {iconWrapper}
      <span className={classes.NavigationalItem}>
        <span className={classes.Title}>{title}</span>
        {description && (
          <span className={classes.Description}>{description}</span>
        )}
      </span>
    </Aux>
  );
};

NavigationalItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
};

NavigationalItem.defaultProps = {
  icon: '',
  description: '',
};

export default NavigationalItem;
