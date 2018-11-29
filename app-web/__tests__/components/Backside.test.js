import React from 'react';
import { shallow } from 'enzyme';
import Backside from '../../src/components/Cards/Backside/Backside';

describe('Backside Component (card)', () => {
  it('matches snapshot', () => {
    const props = {
      actionGroups: [
        {
          title: 'Actions',
          actions: [
            {
              icon: <i>Icon</i>,
              actionName: 'foo',
              actionValue: 'bar',
            },
          ],
        },
      ],
    };

    const wrapper = shallow(<Backside actionGroups={props.actionGroups} />);
    expect(wrapper).toMatchSnapshot();
  });
});
