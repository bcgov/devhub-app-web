import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import rocketchatSVG from '../../../assets/images/rocketchat_logo.svg';

const StyledButton = styled.button`
  color: #fff;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1em;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  display: inline-block;
  background-color: ${({ variant, theme }) => {
    if (theme.colors[variant]) {
      return theme.colors[variant];
    } else {
      return 'initial';
    }
  }};
`;

const variants = {
  primary: 'primary',
  secondary: 'secondary',
  link: 'link',
};

export const Button = ({ variant, children, clicked, ...rest }) => {
  if (variant === variants.link) {
    return (
      <StyledButton
        onClick={clicked}
        style={{
          backgroundColor: 'transparent',
          outline: 'none',
          color: 'inherit',
        }}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  } else {
    return (
      <StyledButton onClick={clicked} {...rest} variant={variant}>
        {children}
      </StyledButton>
    );
  }
};

Button.propTypes = {
  children: PropTypes.node,
  clicked: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
};

Button.defaultProps = {
  children: '',
};

export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 35px;
  padding: 0;
  :focus,
  :active {
    outline: none;
  }
  :disabled {
    opacity: 0.65;
  }
`;

export const RCButton = ({ ...props }) => (
  <IconButton {...props}>
    <img src={rocketchatSVG} style={{ margin: 0 }} alt={'RocketChat logo'} />
  </IconButton>
);

export default Button;
