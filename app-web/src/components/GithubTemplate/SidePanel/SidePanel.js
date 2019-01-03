/*
Copyright 2019 Province of British Columbia

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
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SidePanel.module.css';
import SourceNavigation from '../SourceNavigation/SourceNavigation';
import Header from '../Header/Header';

const SidePanel = ({ siphonData, links, pathname }) => {
  // don't show nav if there aren't any links
  const sourceNavigation =
    links.length > 1 ? <SourceNavigation components={links} activeLink={pathname} /> : null;
  return (
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
  );
};

SidePanel.propTypes = {
  siphonData: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default SidePanel;
