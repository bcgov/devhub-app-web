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
import { JunctionList } from './JunctionList';
import { Station } from '.';

const Legend = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightgrey};
  padding: 4px 8px;
  max-width: 240px;
  h4 {
    text-align: center;
    margin: 4px 0 25px;
    font-weight: 400;
  }
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      display: flex;
      justify-content: flex-start;
      font-size: 14px;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.darkgrey};
      > div {
        flex: 0 0 75px;
      }
    }
  }
`;

const LegendItem = styled.span`
  display: flex;
  ::before {
    content: '─';
    margin-right: 4px;
  }
`;
export const SubwayLegend = () => (
  <Legend>
    <h4>Legend</h4>
    <ul>
      <li>
        <div style={{ transform: 'translateY(5px)' }}>
          <Station color="blue" size={10} name={() => <small>name</small>} />
        </div>
        <LegendItem>Resource</LegendItem>
      </li>
      <li>
        <div>
          <JunctionList
            links={[
              { name: 'topicA', resourceType: 'Topic' },
              { name: 'topicB', resourceType: 'Topic' },
            ]}
            renderLink={link => <span>{link.name}</span>}
          />
        </div>
        <LegendItem>Topics this resource is also found in</LegendItem>
      </li>
    </ul>
  </Legend>
);
