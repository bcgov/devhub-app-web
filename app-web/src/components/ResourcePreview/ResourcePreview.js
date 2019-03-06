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
import styled from '@emotion/styled';
import styles from './ResourcePreview.module.css';

import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/ui';
import { ChevronLink, Link } from '../UI/Link';
import Card from '../Cards/Card/Card';

const CardWrapper = styled.div`
  margin: 6px 9px;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  :hover {
    color: inherit;
    text-decoration: none;
  }
`;

const ResourceContainer = styled.div`
  padding: 15px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    justify-content: flex-start;
  }
`;
// this is a wrapper component that encapsulates cards for collections or other sizes
const ResourcePreview = ({ title, link, resources }) => (
  <section className={styles.ResourcePreview}>
    <h2 className={styles.Title}>
      <StyledLink to={link.to}>{title}</StyledLink>
    </h2>
    <ResourceContainer>
      {resources.slice(0, 4).map(r => (
        <CardWrapper key={r.id}>
          <Card
            type={r.resource.type}
            title={r.unfurl.title}
            description={r.unfurl.description}
            image={r.unfurl.image}
            link={r.resource.path}
          />
        </CardWrapper>
      ))}
    </ResourceContainer>
    <div className={styles.LinkContainer}>
      <ChevronLink to={link.to}>{link.text}</ChevronLink>
    </div>
  </section>
);

ResourcePreview.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResourcePreview;
