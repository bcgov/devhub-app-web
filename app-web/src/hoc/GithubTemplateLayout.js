import React from 'react';
import PropTypes from 'prop-types';

import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';

const GithubTemplateLayout = ({ siphonData, nav, pathname, children }) => {
  return (
    <div className="layout">
      <PrimaryHeader />
      {children}
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
