import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import rocketchatSVG from '../../../assets/images/rocketchat_logo.svg';
import githubPNG from '../../../assets/images/github_logo.png';
import DocumizePNG from '../../../assets/images/documize_logo.png';
import { SEARCH_SOURCES } from '../../../constants/search';

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

const SEARCH_SOURCES_ICON = {
  [SEARCH_SOURCES.rocketchat]: rocketchatSVG,
  [SEARCH_SOURCES.github]: githubPNG,
  [SEARCH_SOURCES.documize]: DocumizePNG,
};

export const SearchSourcesButton = props => (
  <IconButton {...props}>
    <img
      src={SEARCH_SOURCES_ICON[props.searchType]}
      style={{ margin: 0 }}
      alt={props.searchType + ' logo'}
    />
  </IconButton>
);

SearchSourcesButton.propTypes = {
  searchType: PropTypes.string.isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default Button;
