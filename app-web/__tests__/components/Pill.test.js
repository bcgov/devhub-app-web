import React from 'react';
import { shallow } from 'enzyme';
import Pill from '../../src/components/UI/Pill';

describe('Pill Component', () => {
  const props = {
    label: 'hello world',
    onClick: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    props.onClick.mockReset();
    props.onDelete.mockReset();
  });

  it('renders a pill', () => {
    const wrapper = shallow(<Pill {...props} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders an outlined pill', () => {
    const wrapper = shallow(<Pill {...props} variant="outlined" />);

    expect(wrapper.find('OutlinedContainer').exists()).toBeTruthy();
  });

  it('renders a filled pill', () => {
    const wrapper = shallow(<Pill {...props} variant="filled" />);

    expect(wrapper.find('FilledContainer').exists()).toBeTruthy();
  });

  it('does not show font awesome icon if deletable is false', () => {
    const wrapper = shallow(<Pill {...props} deletable={false} />);

    expect(wrapper.find('PillIcon').exists()).toBeFalsy();
  });

  it('calls onDelete if deletable and icon is clicked', () => {
    const wrapper = shallow(<Pill {...props} />);
    wrapper.find('PillIcon').simulate('click');
    expect(props.onDelete).toHaveBeenCalledWith(props.label);
  });

  it('calls onClick when Pill is clicked and it exists in props', () => {
    const wrapper = shallow(<Pill {...props} />);
    wrapper.simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });

  it('does not call onClick when Pill is clicked and it does not exist in props', () => {
    const wrapper = shallow(<Pill {...props} onClick={undefined} />);
    wrapper.simulate('click');
    expect(props.onClick).not.toHaveBeenCalled();
  });
});
