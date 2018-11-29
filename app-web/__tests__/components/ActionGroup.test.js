import React from 'react';
import { shallow } from 'enzyme';
import ActionGroup from '../../src/components/Cards/Backside/ActionGroup/ActionGroup';

describe('ActionGroup Component (card)', () => {
  it('matches snapshot', () => {
    const props = {
      title: 'Actions',
      actions: [
        {
          icon: <i>Icon</i>,
          actionName: 'foo',
          actionValue: 'bar',
        },
      ],
    };

    const wrapper = shallow(<ActionGroup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
