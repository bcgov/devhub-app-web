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

Created by Derek Siemens
*/

import React from 'react';
import styled from '@emotion/styled';
import { HeaderPathBar, PathBarTitle } from '.';
import { Link } from '../../UI/Link';
import { css } from '@emotion/core';
import { flattenGatsbyGraphQL } from '../../../utils/dataHelpers';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';

const PathDiv = styled.div`
  float: left;
  width: 100%;
  font-weight: 400;
  font-size: 15px;
  padding-bottom: 5px;
`;

//Takes the title of a card and returns the other places where this card can be found
//used as input for the PathBar function
export const FindPaths = title => {
  const ResourceData = useStaticQuery(graphql`
    query ResourceQuery {
      allDevhubTopic {
        edges {
          node {
            name
            childrenDevhubSiphon {
              topic {
                name
              }
              resource {
                path
              }
              unfurl {
                title
              }
            }
          }
        }
      }
    }
  `);
  const allCards = flattenGatsbyGraphQL(ResourceData.allDevhubTopic.edges).flatMap(
    topic => topic.childrenDevhubSiphon,
  );

  const duplicateCards = allCards.filter(card => card.unfurl.title === title);
  const paths = duplicateCards.map(path => {
    path = {
      name: path.topic.name,
      link: path.resource.path,
    };
    return path;
  });

  return paths;
};

//This returns a component which has a list of the places a resource is shown if the showPath boolean is true (if the card has been clicked)
export const PathBar = ({ showPath, type, links }) => {
  if (showPath === true) {
    return (
      <div>
        <HeaderPathBar type={type}>
          <PathBarTitle>Where would you like to view this resource?</PathBarTitle>
          <PathDiv>
            {links.map(link => {
              return (
                <Link
                  to={link.link}
                  key={link.name}
                  css={css`
                    display: inline-block;
                    padding-bottom: 2px;
                    padding-right: auto;
                  `}
                >
                  {link.name}
                  <br />
                </Link>
              );
            })}
          </PathDiv>
        </HeaderPathBar>
      </div>
    );
  } else {
    return <div />;
  }
};
