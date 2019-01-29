import React from 'react';
import { shallow, mount } from 'enzyme';
import { Search } from '../../src/components/Search/Search';
import Button from '../../src/components/UI/Button/Button';

describe('Search Bar', () => {
  let searchBar;
  const keyupHandled = jest.fn();
  const search = jest.fn();
  const onSearchClear = jest.fn();
  const terms = '';

  beforeEach(() => {
    searchBar = (
      <Search
        onkeyup={keyupHandled}
        onSearch={search}
        onSearchClear={onSearchClear}
        terms={terms}
      />
    );
    search.mockClear();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(searchBar);

    expect(wrapper).toMatchSnapshot();
  });

  it('calls the search handler when button is clicked and terms have length', () => {
    const wrapper = mount(searchBar);
    wrapper.setState({ terms: 'foo' });
    const button = wrapper.find(Button).first();
    button.find('button').simulate('click');
    expect(search).toHaveBeenCalled();
  });

  it("doesn't call search handler when button is clicked and there are no terms ", () => {
    const wrapper = mount(searchBar);
    const button = wrapper.find(Button).first();
    expect(wrapper.state('terms')).toBe('');
    button.find('button').simulate('click');
    expect(search).not.toHaveBeenCalled();
  });

  it('sets touched state if search was touched', () => {
    const wrapper = shallow(searchBar);
    const input = wrapper.find('input').first();
    input.simulate('focus');
    expect(wrapper.state('touched')).toBe(true);
  });

  it('calls the search handler when enter key is pressed and configured to do so', () => {
    const wrapper = mount(searchBar);
    wrapper.setProps({ searchOnEnter: true });
    wrapper.setState({ terms: 'foo' });
    const input = wrapper.find('input');
    input.simulate('keypress', { key: 'Enter' });
    expect(search).toHaveBeenCalledWith('foo');
  });
});
