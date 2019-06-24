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
import { HeaderPathBar, DecorativeBar, PathBarTitle } from '.';
import { Link } from '../../UI/Link';

const PathDiv = styled.div`
  float: left;
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;
/*
export const FindPaths = () => {
  const ResourceData = useStaticQuery(graphql`
    query ResourceQuery {
      allDevhubCollection {
        edges {
          node {
            name
            childrenDevhubSiphon {
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
  console.log(ResourceData.ResourceQuery);
};*/

export const PathBar = ({ Paths, type, links }) => {
  if (Paths === true) {
    return (
      <div>
        <DecorativeBar type={type}>
          <HeaderPathBar type={type}>
            <PathBarTitle>What Topic would you like to see this resource in?</PathBarTitle>
            <PathDiv>
              {links.map(link => {
                return (
                  <Link to={link.link} key={link.name}>
                    {link.name}
                    <br />
                  </Link>
                );
              })}
            </PathDiv>
          </HeaderPathBar>
        </DecorativeBar>
      </div>
    );
  } else {
    return <div />;
  }
};
