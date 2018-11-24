import React from 'react';
import Link from 'gatsby-link';

const GatsbyLink = ({ children, to, ...rest }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for rests
  if (internal) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
};

export default GatsbyLink;
