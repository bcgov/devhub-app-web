import React from 'react';

import { RESOURCE_TYPES } from '../../src/constants/ui';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { render, cleanup } from '@testing-library/react';
import ResourceTypeIcon, { TEST_IDS } from '../../src/components/UI/ResourceTypeIcon';
describe('Card Header Component', () => {
  afterEach(cleanup);
  it('renders a puzzle piece when component is passed in as type', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ResourceTypeIcon type={RESOURCE_TYPES.COMPONENTS} />
      </ThemeProvider>,
    );

    const icon = queryByTestId(TEST_IDS.icon);
    expect(icon).toBeInTheDocument();
  });

  it('returns nothing if resourceType is invalid', () => {
    global.console.error = jest.fn();
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ResourceTypeIcon type="blah" />
      </ThemeProvider>,
    );
    const icon = queryByTestId(TEST_IDS.icon);
    expect(icon).not.toBeInTheDocument();
  });
});
