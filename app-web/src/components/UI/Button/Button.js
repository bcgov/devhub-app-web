import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';
import { buttonTypes } from '../../../constants/ui';

const Button = ({ type, children, clicked, ...rest }) => {
  let buttonClasses = [classes.Button];
  const typeClass = classes[type];
  buttonClasses = buttonClasses.concat([typeClass]);
  return (
    <button className={buttonClasses.join(' ')} onClick={clicked} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  clicked: PropTypes.func.isRequired,
  type: PropTypes.oneOf(buttonTypes),
};

Button.defaultProps = {
  children: '',
};

export default Button;
