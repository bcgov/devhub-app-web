import PropTypes from 'prop-types';
import React from 'react';
import classes from './Circle.module.css';

const Circle = ({ className, children, ...rest }) => {
  let circleClasses = [classes.circle, className];
  return <div className={circleClasses.join(' ')}>{children}</div>;
};

Circle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Circle.defaultProps = {
  children: '',
  className: '',
};

export default Circle;
