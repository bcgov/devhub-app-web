import React from 'react';

import { RESOURCE_TYPES, COLLECTIONS, EVENTS } from '../../src/constants/ui';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { render, cleanup } from 'react-testing-library';
import ResourceTypeIcon, { TEST_IDS } from '../../src/components/UI/ResourceTypeIcon';
import 'jest-dom/extend-expect';
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
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ResourceTypeIcon type="blah" />
      </ThemeProvider>,
    );
    const icon = queryByTestId(TEST_IDS.icon);
    expect(icon).not.toBeInTheDocument();
  });
});
