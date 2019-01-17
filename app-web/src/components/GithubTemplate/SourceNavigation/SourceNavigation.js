/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Link from '../../UI/Link/Link';
import styles from './SourceNavigation.module.css';
// navigation for dynamically created page components
class SourceNavigation extends Component {
  componentDidMount() {
    // scroll into view of active link if exists
    const activeLi = document.querySelector(`.${styles.Navigation} li[data-active="true"]`);
    if (activeLi) {
      activeLi.scrollIntoView();
    }
  }

  render() {
    const { components } = this.props;
    // map over components and generate links
    const links = components.map(
      ({
        node: {
          unfurl: { title },
          resource: { path },
          source: { type },
        },
      }) => (
        <li key={shortid.generate()} data-active={this.props.activeLink.pathname === path}>
          <Link
            to={path}
            target={type === 'web' ? '_blank' : ''}
            activeStyle={{
              backgroundColor: '#fff',
              textDecoration: 'underline',
            }}
          >
            {title}
            {type === 'web' ? (
              <span>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </span>
            ) : null}
          </Link>
        </li>
      ),
    );
    return (
      <nav className={styles.Navigation}>
        <ul className={styles.List}>{links}</ul>
      </nav>
    );
  }
}

export const query = graphql`
  fragment NavigationFragment on DevhubSiphon {
    unfurl {
      title
    }
    resource {
      path
    }
    source {
      type
    }
  }
`;

SourceNavigation.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        resourcePath: PropTypes.string,
        resourceTitle: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default SourceNavigation;
