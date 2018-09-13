import PropTypes from 'prop-types';
import React from 'react';
import classes from './Button.module.css';

const Button = props => (
  <button className={classes.Button}>{props.children}</button>
);

Button.propTypes = {
  children: PropTypes.node,
};

Button.defaultProps = {
  children: '',
};

export default Button;
