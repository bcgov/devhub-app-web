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
import { css } from '@emotion/core';

import { RESOURCE_TYPES_LIST, EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/ui';
import { ChevronLink, Link } from '../UI/Link';
import Card from '../Cards/Card/Card';
import { DecorativeBar, CardTitle, CardDescription } from '../Cards/Card';
import CardHeader from '../Cards/Card/CardHeader';

const withPadding = css`
  padding: 0 15px;
`;

const CollectionDecorativeBar = styled(DecorativeBar)`
  min-height: 15px;
`;

const CollectionPreviewContainer = styled.div`
  ${withPadding};
  padding-top: 10px;
  padding-bottom: 20px;
`;

const ResourceContainer = styled.div`
  padding: 15px 0;
  border-top: 1px solid #ccc;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    justify-content: flex-start;
  }
`;
const CollectionTitle = styled(CardTitle)`
  font-weight: 700;
  margin: 10px 0;
  font-size: 26px;
`;

const CollectionDescription = styled(CardDescription)`
  max-width: 500px;
  margin-bottom: 15px;
`;

const CollectionLinkWrapper = styled.div`
  text-align: right;
  font-size: 1.15em;
`;

const CollectionPreview = ({ title, description, link, resources }) => (
  <section
    css={css`
      max-width: 1104px;
      margin: 20px 15px;
      border: 1px solid #ccc;
    `}
  >
    <CollectionDecorativeBar type="Collections" />
    <CollectionPreviewContainer>
      <CardHeader type="Collections" />
      <CollectionTitle>{title}</CollectionTitle>

      {description && <CollectionDescription>{description}</CollectionDescription>}
      <ResourceContainer>
        {resources.slice(0, 4).map(r => (
          <div
            key={r.id}
            css={css`
              margin: 6px 9px;
            `}
          >
            <Card
              type={r.resource.type}
              title={r.unfurl.title}
              description={r.unfurl.description}
              image={r.unfurl.image}
              link={r.resource.path}
            />
          </div>
        ))}
      </ResourceContainer>
      <CollectionLinkWrapper>
        <ChevronLink to={link}>View Collection</ChevronLink>
      </CollectionLinkWrapper>
    </CollectionPreviewContainer>
  </section>
);

CollectionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string.isRequired,
    }),
  ),
};

CollectionPreview.defaultProps = {
  description: null,
};

export default CollectionPreview;
