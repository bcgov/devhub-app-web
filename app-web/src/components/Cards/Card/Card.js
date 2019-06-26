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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validUrl from 'valid-url';
import CardHeader from './CardHeader';
import { PathBar } from './PathBar';
import { css } from '@emotion/core';

import { CardBodyDiv, CardLinkWrapper, CardWrapper, DecorativeBar } from './index';
import { RESOURCE_TYPES_LIST } from '../../../constants/ui';
import CardBody from './CardBody';

const Card = ({ type, title, description, image, link, paths, ...rest }) => {
  let [showPaths, updateBool] = useState(false);
  let isExternal = !!validUrl.isWebUri(link);

  //This checks if the given card is shown in serveral collections or if its an external link
  //if its neither, we do not want to show the paths/there wouldnt be any
  if (paths !== undefined && paths.length > 1 && !isExternal) {
    return (
      <div
        css={css`
          padding: 0 4px;
          margin: 0 2px;
        `}
        onClick={() => updateBool(!showPaths)}
      >
        <CardWrapper {...rest}>
          <DecorativeBar type={type} />
          <CardBodyDiv>
            <CardHeader
              type={type}
              linksToExternal={isExternal}
              showPathIcon={true}
              showXIcon={showPaths}
            />
            <PathBar showPath={showPaths} links={paths} />
            <CardBody
              title={title}
              description={description}
              image={image}
              event={rest.event}
              showBody={!showPaths}
            />
          </CardBodyDiv>
        </CardWrapper>
      </div>
    );
  } else {
    return (
      <CardLinkWrapper to={link}>
        <CardWrapper {...rest}>
          <DecorativeBar type={type} />
          <CardBodyDiv>
            <CardHeader type={type} linksToExternal={isExternal} />
            <CardBody
              title={title}
              description={description}
              image={image}
              event={rest.event}
              showBody={true}
            />
          </CardBodyDiv>
        </CardWrapper>
      </CardLinkWrapper>
    );
  }
};

Card.propTypes = {
  type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string.isRequired,
};

Card.defaultProps = {
  description: null,
  image: null,
};

export default Card;
