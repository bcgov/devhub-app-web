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

// common card layout components
import styled from '@emotion/styled';
import { Link } from '../../UI/Link';
import DotDotDot from 'react-dotdotdot';
import Image from 'react-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CUSTOM_TYPE } from '../../../constants/designTokens';
import { EventLogoWrapper, DateLI, EventDetailsContainer } from '../../Event';

export const designTokens = {
  description: `
    font-size: ${CUSTOM_TYPE.sm};
    line-height: 1.4;
    flex: 0 0 auto;
    margin-bottom: 0;
    text-transform: none;
  `,
};

export const CardLinkWrapper = styled(Link)`
  text-decoration: none;
  color: initial;
  :hover {
    text-decoration: none;
    color: initial;
    cursor: pointer;
  }
`;

export const DecorativeBar = styled.div`
  background-color: ${props => props.theme.colors[props.type]};
  flex: 0 0 10px;
`;

export const CardWrapper = styled.article`
  width: 250px;
  height: 225px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-top: transparent;
  border-radius: 2px;
  box-sizing: border-box;
  transition: transform 0.25s ease-out;
  box-shadow: 0 1px 2px 1px #00000026;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  :hover {
    box-shadow: 0 2px 2px 1px #00000026;
    transform: translateY(-2px);
  }
`;

export const CardTitle = styled(DotDotDot)`
  font-size: 20px;
  color: #494949;
  line-height: 1.3;
  margin-bottom: 0;
  flex: 0 0 auto;
  word-break: break-word;
`;

export const CardDescription = styled(DotDotDot)`
  ${designTokens.description};
`;

export const EventImageWrapper = styled(EventLogoWrapper)`
  margin-top: 0px;
  img {
    margin-left: -8px;
    padding-left: 0px;
  }
`;

// combination of card image and wrapper make images response correctly
// to the flex container. The card image wrapper can grow/shrink automatically
// the object-fit scaledown maintains aspect ratio for any type of image
export const CardImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: scale-down;
  max-height: 100%;
  margin-bottom: 0;
`;

export const CardImageWrapper = styled.div`
  flex: 1 1 auto;
  align-self: center;
  overflow: hidden;
  padding-top: 10px;
  text-align: center;
  display: flex;
`;

export const EventInfoDiv = styled.div`
  > li {
    margin-bottom: -5px;
  }
`;

export const EventDate = styled(DateLI)`
  border-radius: 0px;
  border: 0px;
  margin: 0;
  > span {
    margin-top: -15px;
  }
  > small {
    bottom: 0.1em;
  }
`;

export const EventContainer = styled(EventDetailsContainer)`
  margin-top: 5px;
  margin-left: -15px;
  overflow: hidden;
  > li {
    margin-bottom: 0px;
  }
`;

export const CardBody = styled.div`
  padding: 6px 10px;
  height: 100%;
  overflow: overlay;
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  margin-bottom: 10px;
  flex-flow: column nowrap;
`;

export const CircleIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  background-color: ${props => props.theme.colors[props.type]};
  color: #fff;
  font-size: 25px;
`;

export const CircleIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ResourceCountGroup = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  flex: 1 0 50%;
`;

export const ResourceCountTitle = styled.span`
  margin-left: 10px;
`;

export const ResourceCounts = styled.ul`
  display: flex;
  flex-flow: row wrap;
  padding: 6px 10px;
  margin: 0;
  flex: 0 0 50%;
`;
