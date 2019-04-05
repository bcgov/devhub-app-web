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
import styled from '@emotion/styled';

export const TEST_IDS = {
  container: 'no-resources',
};

const NoResources = styled.div`
  font-size: 28px;
  background-color: #fafafa;
  padding: 20px;
  margin: 10px;
  border-radius: 2px;
  color: #444;
  border: 1px dashed #ccc;
`;

export default () => (
  <NoResources data-testid={TEST_IDS.container}>
    <h2>Upcoming events are in the works.</h2>
    <p>Visit again soon :)</p>
  </NoResources>
);
