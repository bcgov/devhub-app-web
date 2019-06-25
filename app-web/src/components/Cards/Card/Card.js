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
import validUrl from 'valid-url';
import CardHeader from './CardHeader';
import { PathBar } from './PathBar';
import { css } from '@emotion/core';

import { CardBodyDiv, CardLinkWrapper, CardWrapper, DecorativeBar } from './index';
import { RESOURCE_TYPES_LIST } from '../../../constants/ui';
import { CardBody } from './CardBody';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPaths: false };
  }

  handleClick = () => {
    this.setState({ showPaths: !this.state.showPaths });
  };

  render() {
    let isExternal = !!validUrl.isWebUri(this.props.link);

    if (this.props.paths !== undefined && this.props.paths.length > 1 && !isExternal) {
      return (
        <div
          css={css`
            padding: 0 4px;
            margin: 0 2px;
          `}
          onClick={this.handleClick}
        >
          <CardWrapper {...this.props}>
            <DecorativeBar type={this.props.type} />
            <CardBodyDiv>
              <CardHeader
                type={this.props.type}
                linksToExternal={isExternal}
                showPathIcon={true}
                showXIcon={this.state.showPaths}
              />
              <PathBar showPath={this.state.showPaths} links={this.props.paths} />
              <CardBody
                title={this.props.title}
                description={this.props.description}
                image={this.props.image}
                event={this.props.event}
                showBody={!this.state.showPaths}
              />
            </CardBodyDiv>
          </CardWrapper>
        </div>
      );
    } else {
      return (
        <CardLinkWrapper to={this.props.link}>
          <CardWrapper {...this.props}>
            <DecorativeBar type={this.props.type} />
            <CardBodyDiv>
              <CardHeader type={this.props.type} linksToExternal={isExternal} />
              <CardBody
                title={this.props.title}
                description={this.props.description}
                image={this.props.image}
                event={this.props.event}
                showBody={true}
              />
            </CardBodyDiv>
          </CardWrapper>
        </CardLinkWrapper>
      );
    }
  }
}

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
