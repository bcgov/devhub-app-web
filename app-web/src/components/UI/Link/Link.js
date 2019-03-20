import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${props => props.theme.colors.link};
  font-weight: 400;
  text-transform: capitalize;
  padding: 0 4px;
  margin: 0 2px;
`;

const Anchor = StyledLink.withComponent('a');

const GatsbyLink = ({ children, to, activeClassName, activeStyle, ...rest }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for rests
  if (internal) {
    return (
      <StyledLink to={to} activeStyle={activeStyle} activeClassName={activeClassName} {...rest}>
        {children}
      </StyledLink>
    );
  }
  return (
    <Anchor href={to} {...rest}>
      {children}
    </Anchor>
  );
};

GatsbyLink.defaultProps = {
  activeClassName: '',
  activeStyle: {},
};

export default GatsbyLink;
