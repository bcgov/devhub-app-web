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

const PathDiv = styled.div`
  float: left;
  width: 100%;
  font-weight: 400;
  font-size: 15px;
  padding-bottom: 5px;
`;

export const PathBar = ({ showPath, type, links }) => {
  if (showPath === true) {
    return (
      <div>
        <HeaderPathBar type={type}>
          <PathBarTitle>View this resource in...</PathBarTitle>
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
