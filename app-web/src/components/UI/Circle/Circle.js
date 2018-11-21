import React from 'react';
import PropTypes from 'prop-types';
import classes from './Circle.module.css';

const Circle = ({ type, children, ...rest }) => {
  let circleClasses = [classes.circle];
  const typeClass = classes[type];
  circleClasses = circleClasses.concat([typeClass]);
  return (
    <div className={circleClasses.join(' ')}>
        { children }
    </div>
  );
};

Circle.propTypes = {
  children: PropTypes.string,
  clicked: PropTypes.func.isRequired,
};

Circle.defaultProps = {
  children: '',
};

export default Circle;
