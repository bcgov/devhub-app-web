import React from 'react';
import { mount } from 'enzyme';
import ToolsMenu from '../../src/components/ToolsMenu/ToolsMenu';
import { DEFAULT_FILTER_GROUPS } from '../../src/constants/filterGroups';
import { navigate } from 'gatsby';

describe('Tools Menu', () => {
  let toolsMenu;

  const searchCount = 0;
  const searchWordLength = 0;
  const setSearchBarTerms = jest.fn();
  const totalNodeCount = 100;

  beforeEach(() => {
    toolsMenu = mount(
      <ToolsMenu
        filters={DEFAULT_FILTER_GROUPS}
        searchCount={searchCount}
        totalNodeCount={totalNodeCount}
        setSearchBarTerms={setSearchBarTerms}
        searchWordLength={searchWordLength}
      />,
    );
  });

  it('renders the tools menu', () => {
    expect(toolsMenu);
  });

  it('calls the navigate fn when searched', () => {
    const terms = 'foo';
    const searchBar = toolsMenu.find('input');
    searchBar.simulate('change', { target: { value: terms } });
    searchBar.simulate('keypress', { key: 'Enter' });

    expect(navigate).toHaveBeenCalledWith(`/?q=${encodeURIComponent(terms)}`);
  });
});
