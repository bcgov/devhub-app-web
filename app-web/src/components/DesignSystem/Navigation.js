import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Link from '../Common/Link';
import styles from './Navigation.module.css';

const Navigation = ({ components }) => {
  // map over components and generate links
  const links = components.map(({ node: { resourcePath, childMarkdownRemark } }) => (
    <li key={shortid.generate()}>
      <Link
        to={resourcePath}
        activeStyle={{
          backgroundColor: '#fff',
          textDecoration: 'underline',
        }}
      >
        {childMarkdownRemark.frontmatter.title}
      </Link>
    </li>
  ));

  return (
    <nav className={styles.Navigation}>
      <ul className={styles.List}>{links}</ul>
    </nav>
  );
};

export const query = graphql`
  fragment NavigationFragment on SourceDevhubGithub {
    childMarkdownRemark {
      frontmatter {
        title
      }
    }
    resourcePath
  }
`;

Navigation.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        resourcePath: PropTypes.string,
        childMarkdownRemark: PropTypes.object,
      }),
    })
  ).isRequired,
};

export default Navigation;
