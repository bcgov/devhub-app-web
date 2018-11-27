import React from 'react';
import PropTypes from 'prop-types';
// stylesheets
import styles from './TemplateLayout.module.css';
// layout local componenets
import SourceNavigation from '../components/SourceNavigation/SourceNavigation';
import Layout from './Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const GithubTemplateLayout = ({ siphonData, nav, pathname, children }) => {
  // SourceNavigation doesn't show up if there are no links
  const sourceNavigation =
    nav.edges.length > 0 ? <SourceNavigation components={nav.edges} activeLink={pathname} /> : null;
  return (
    <Layout>
      <div className={styles.TemplateContainer}>
        <div className={styles.SidePanel}>
          <header className={styles.Header}>
            <h1>{siphonData.source.displayName}</h1>
            <ul className={styles.SourceTags}>
              <li>
                <a href={siphonData.resource.originalSource}>
                  <FontAwesomeIcon
                    icon={faGithub}
                    aria-label={`View the original source ${siphonData.fileName} on github`}
                  />
                </a>
              </li>
              <li>
                <a href={`${siphonData.source.sourcePath}fork`}>
                  <FontAwesomeIcon
                    icon={faCodeBranch}
                    aria-label={`Fork ${siphonData.source.name} on github`}
                  />
                </a>
              </li>
            </ul>
          </header>
          {sourceNavigation}
        </div>
        <section className={styles.Content}>{children}</section>
      </div>
    </Layout>
  );
};

GithubTemplateLayout.propTypes = {
  children: PropTypes.node.isRequired,
  siphonData: PropTypes.shape({
    source: PropTypes.shape({
      sourcePath: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }),
    resource: PropTypes.shape({
      originalSource: PropTypes.string.isRequired,
    }),
  }),
  nav: PropTypes.object.isRequired,
  pathname: PropTypes.object.isRequired,
};

export default GithubTemplateLayout;
