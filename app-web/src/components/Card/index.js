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
