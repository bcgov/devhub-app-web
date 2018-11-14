import React, { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Link from '../Common/Link';
import styles from './Navigation.module.css';
// navigation for dynamically created page components
class Navigation extends Component {
  componentDidMount() {
    // scroll into view of active link if exists
    const activeLi = document.querySelector(`.${styles.Navigation} li[data-active="true"]`);
    activeLi.scrollIntoView();
  }

  render() {
    const { components } = this.props;
    // map over components and generate links
    const links = components.map(({ node: { resourcePath, resourceTitle } }) => (
      <li key={shortid.generate()} data-active={this.props.activeLink.pathname === resourcePath}>
        <Link
          to={resourcePath}
          activeStyle={{
            backgroundColor: '#fff',
            textDecoration: 'underline',
          }}
        >
          {resourceTitle}
        </Link>
      </li>
    ));
    return (
      <nav className={styles.Navigation}>
        <ul className={styles.List}>{links}</ul>
      </nav>
    );
  }
}

export const query = graphql`
  fragment NavigationFragment on DevhubSiphon {
    resourceTitle
    resourcePath
  }
`;

Navigation.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        resourcePath: PropTypes.string,
        resourceTitle: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default Navigation;
