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
import { RESOURCE_TYPES, TOPICS, SEARCH_RESOURCE_TYPES } from '../../constants/ui';
import Dotdotdot from 'react-dotdotdot';
import Link from '../UI/Link/Link';

export { BaseCard } from './Card';

export const Container = styled.article`
  width: 265px;
  height: 238.5px;
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

export const DecorativeBar = styled.div`
  background-color: ${props => props.theme.colors[props.color]};
  flex: 0 0 10px;
  min-height: 10px;
`;

export const Title = styled(Dotdotdot)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.grey};
  line-height: 1.3;
  margin-bottom: 0;
  flex: 0 0 auto;
  text-transform: capitalize;
  word-break: break-word;
`;

export const Description = styled(Dotdotdot)`
  line-height: 1.4;
  font-size: 14px;
  flex: 0 0 auto;
  margin-bottom: 0;
  text-transform: none;
`;

export const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: initial;
  :hover {
    text-decoration: none;
    color: initial;
    cursor: pointer;
  }
`;

/**
 * used to predictably lay out titles/ descriptions/images in a flex box within a card
 */
export const CardBody = styled.div`
  padding: 6px 10px;
  height: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-flow: column nowrap;
`;

// combination of card image and wrapper make images response correctly
// to the flex container. The card image wrapper can grow/shrink automatically
// the object-fit scaledown maintains aspect ratio for any type of image
export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: scale-down;
  max-height: 100%;
  margin-bottom: 0;
`;

export const ImageWrapper = styled.div`
  flex: 1 1 auto;
  align-self: center;
  overflow: hidden;
  padding-top: 10px;
  text-align: center;
  display: flex;
`;

export const CONTENT = {
  byResourceType: {
    [RESOURCE_TYPES.COMPONENTS]: {
      id: 'RESOURCE_TYPES.COMPONENTS',
      text: 'Component',
    },
    [RESOURCE_TYPES.DOCUMENTATION]: {
      id: 'RESOURCE_TYPES.DOCUMENTATION',
      text: 'Documentation',
    },
    [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: {
      id: 'RESOURCE_TYPES.SELF_SERVICE_TOOLS',
      text: 'Tool',
    },
    [RESOURCE_TYPES.PEOPLE]: {
      id: 'RESOURCE_TYPES.PEOPLE',
      text: 'Contact',
    },
    [RESOURCE_TYPES.REPOSITORIES]: {
      id: 'RESOURCE_TYPES.REPOSITORIES',
      text: 'Repository',
    },
    [TOPICS]: {
      id: 'RESOURCE_TYPES.TOPICS',
      text: 'Topic',
    },
    [RESOURCE_TYPES.EVENTS]: {
      id: 'RESOURCE_TYPES.EVENTS',
      text: 'Event',
    },
    [SEARCH_RESOURCE_TYPES.GITHUB_ISSUE]: {
      id: 'SEARCH_RESOURCE_TYPES.GITHUB_ISSUE',
      text: 'Github Issue',
    },
  },
};
