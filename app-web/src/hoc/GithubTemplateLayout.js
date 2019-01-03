import React from 'react';
import PropTypes from 'prop-types';
// stylesheets
import styles from './TemplateLayout.module.css';
// layout local componenets
import SourceNavigation from '../components/SourceNavigation/SourceNavigation';
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';

import Header from '../components/GithubTemplate/Header/Header';

const GithubTemplateLayout = ({ siphonData, nav, pathname, children }) => {
  // SourceNavigation doesn't show up if there are no links
  const sourceNavigation =
    nav.edges.length > 1 ? <SourceNavigation components={nav.edges} activeLink={pathname} /> : null;
  return (
    <div className="layout">
      <PrimaryHeader />
      <div className={styles.TemplateContainer}>
        <div className={styles.SidePanel}>
          <Header
            title={siphonData.source.displayName}
            originalSource={siphonData.resource.originalSource}
            fileName={siphonData.fileName}
            sourcePath={siphonData.source.sourcePath}
            repo={siphonData.source.name}
          />
          {sourceNavigation}
        </div>
        <main className={styles.Content}>{children}</main>
      </div>
      <PrimaryFooter />
    </div>
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
