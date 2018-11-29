import React from 'react';
import { shallow } from 'enzyme';
import Action from '../../src/components/Cards/Backside/ActionGroup/Action/Action';
import Link from '../../src/components/UI/Link/Link';
describe('Action Component (card)', () => {
  it('matches snapshot', () => {
    const props = {
      icon: <i>Icon</i>,
      actionName: 'foo',
      actionValue: 'bar',
    };

    const wrapper = shallow(<Action {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a link when link prop is passed in', () => {
    const props = {
      icon: <i>Icon</i>,
      actionName: 'foo',
      actionValue: 'bar',
      link: '/something',
    };

    const wrapper = shallow(<Action {...props} />);
    const anchorTag = wrapper.find(Link).first();
    expect(anchorTag.props().to).toBe(props.link);
  });

  it('renders no link when link prop is NOT passed in', () => {
    const props = {
      icon: <i>Icon</i>,
      actionName: 'foo',
      actionValue: 'bar',
    };

    const wrapper = shallow(<Action {...props} />);
    const anchorTag = wrapper.find(Link);
    expect(anchorTag.exists()).toBe(false);
  });
});
