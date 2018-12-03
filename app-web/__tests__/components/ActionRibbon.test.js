/*
Copyright 2018 Province of British Columbia

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
import { shallow } from 'enzyme';
import ActionsRibbon from '../../src/components/Cards/Card/ActionsRibbon';

describe('Button Component', () => {
  let wrapper;

  const action = {
    icon: <i>Icon</i>,
    flag: 'features.flag',
    name: 'action',
    getHref: jest.fn(),
    ariaLabel: 'ariaLabel',
  };

  const repo = 'repo';
  const owner = 'owner';

  beforeEach(() => {
    wrapper = shallow(<ActionsRibbon actions={[action]} repository={repo} owner={owner} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls getHref from an action', () => {
    expect(action.getHref).toBeCalledWith(repo, owner);
  });
});
