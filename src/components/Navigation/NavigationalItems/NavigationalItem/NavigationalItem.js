import React from 'react';
import { push } from 'gatsby-link';
import PropTypes from 'prop-types';
import HexBlock from '../../../UI/HexBlock/HexBlock';
import classes from './NavigationalItem.module.css';

const NavigationalItem = props => (
  <HexBlock icon={props.icon} clicked={() => push(props.link)} collapses gridClassNumber={props.hexGridClassNumber}>
    <div>
      <h3 className={classes.Title}>{props.title}</h3>
      {props.description && <p className={classes.Description}>{props.description}</p>}
    </div>
  </HexBlock>
);

NavigationalItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  hexGridClassNumber: PropTypes.number.isRequired
};

NavigationalItem.defaultProps = {
  icon: '',
  description: '',
};

export default NavigationalItem;
