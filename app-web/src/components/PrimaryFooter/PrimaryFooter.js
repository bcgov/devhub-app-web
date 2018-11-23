import React from 'react';
import PropTypes from 'prop-types';
import classes from './PrimaryFooter.module.css';

const PrimaryFooter = props => (
  <footer className={classes.PrimaryFooter}>
    <div class={classes.Container} />
  </footer>
);


PrimaryFooter.propTypes = {
  children: PropTypes.node,
};

PrimaryFooter.defaultProps = {
  children: '',
};

export default PrimaryFooter;
