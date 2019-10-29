import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

import ToolsMenu from '../../src/components/ToolsMenu/ToolsMenu';
import DEFAULT_FILTER_GROUPS from '../../src/constants/filterGroups';

describe('Tools Menu', () => {
  const props = {
    searchCount: 0,
    searchWordLength: 0,
    setSearchBarTerms: jest.fn(),
    totalNodeCount: 100,
    filters: DEFAULT_FILTER_GROUPS,
  };

  it('renders the tools menu', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ToolsMenu {...props} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
