import React from 'react';
import { push } from 'gatsby-link';
import PropTypes from 'prop-types';
import HexBlock from '../../../UI/HexBlock/HexBlock';
import classes from './NavigationalItem.module.css';

const NavigationalItem = props => (
  <HexBlock
    icon={props.icon}
    link={props.link}
    collapses
    gridClassNumber={props.hexGridClassNumber}
  >
    <span className={classes.NavigationalItem}>
      <span className={classes.Title}>{props.title}</span>
      {props.description && (
        <span className={classes.Description}>{props.description}</span>
      )}
    </span>
  </HexBlock>
);

NavigationalItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  hexGridClassNumber: PropTypes.number.isRequired,
};

NavigationalItem.defaultProps = {
  icon: '',
  description: '',
};

export default NavigationalItem;
