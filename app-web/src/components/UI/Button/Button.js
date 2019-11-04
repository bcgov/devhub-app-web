import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import rocketchatSVG from '../../../assets/images/rocketchat_logo.svg';
import githubPNG from '../../../assets/images/github_logo.png';
import DocumizePNG from '../../../assets/images/documize_logo.png';

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
  background-color: ${({ color, theme }) => {
    if (theme.colors[color]) {
      return theme.colors[color];
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

export const TEST_IDS = {
  button: 'button',
};
export const Button = ({ variant, children, clicked, ...rest }) => {
  const colors = {
    [variants.primary]: 'blue',
    [variants.secondary]: 'yellow',
  };
  if (variant === variants.link) {
    return (
      <StyledButton
        onClick={clicked}
        style={{
          backgroundColor: 'transparent',
          outline: 'none',
          color: 'inherit',
        }}
        data-testid={TEST_IDS.button}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  } else {
    return (
      <StyledButton
        onClick={clicked}
        color={colors[variant]}
        data-testid={TEST_IDS.button}
        {...rest}
      >
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

export const RCButton = props => (
  <IconButton {...props}>
    <img src={rocketchatSVG} style={{ margin: 0 }} alt={'RocketChat logo'} />
  </IconButton>
);

export const GithubButton = props => (
  <IconButton {...props}>
    <img src={githubPNG} style={{ margin: 0 }} alt={'Github logo'} />
  </IconButton>
);

export const DocumizeButton = props => (
  <IconButton {...props}>
    <img src={DocumizePNG} style={{ margin: 0 }} alt={'Documize logo'} />
  </IconButton>
);

export default Button;
