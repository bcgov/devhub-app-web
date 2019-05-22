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
import { css } from '@emotion/core';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';
import { SPACING } from '../../constants/designTokens';
import styled from '@emotion/styled';
// common styles and utils between template components

export const withPadding = css`
  padding: ${SPACING['4x']} ${SPACING['3x']};
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    padding: ${SPACING['4x']} ${SPACING['9x']};
  }
`;

export const Main = styled.main`
  background-color: #fff;
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  ${withPadding}
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    flex-direction: row;
  }
`;

export const SidePanel = styled.nav`
  flex-flow: column nowrap;
  flex: 0 0 250px;
  margin-right: 25px;
  display: none;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    display: flex;
  }
`;

export const SideDrawerToggleButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 10px 0;
  color: ${props => props.theme.primary};
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  :focus {
    outline: none;
  }
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    display: none;
  }
`;
