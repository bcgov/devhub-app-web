import React from 'react';
import PropTypes from 'prop-types';
import HexBlock from '../../../UI/HexBlock/HexBlock';
import classes from './NavigationalItem.module.css';

const NavigationalItem = props => (
  <HexBlock icon={props.icon}>
    <div>
      <h3 className={classes.Title}>{props.title}</h3>
      {props.description && <p>props.description</p>}
    </div>
  </HexBlock>
);

NavigationalItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

NavigationalItem.defaultProps = {
  icon: false,
  description: '',
};

export default NavigationalItem;
