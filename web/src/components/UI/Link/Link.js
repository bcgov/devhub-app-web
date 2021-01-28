import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.linkblue};
  font-weight: 400;
  text-transform: capitalize;
  padding: 0 4px;
  margin: 0 2px;
`;

const Anchor = StyledLink.withComponent('a');

export const TEST_IDS = {
  gatsbyLink: 'ui-gatsby-link',
  link: 'ui-link',
};

const GatsbyLink = ({ children, to, activeClassName, activeStyle, ...rest }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for rests
  if (internal) {
    return (
      <StyledLink
        to={to}
        activeStyle={activeStyle}
        activeClassName={activeClassName}
        data-testid={TEST_IDS.gatsbyLink}
        {...rest}
      >
        {children}
      </StyledLink>
    );
  }
  return (
    <Anchor data-testid={TEST_IDS.link} href={to} {...rest}>
      {children}
    </Anchor>
  );
};

GatsbyLink.defaultProps = {
  activeClassName: '',
  activeStyle: {},
};

export default GatsbyLink;
