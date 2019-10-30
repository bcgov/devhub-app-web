import React from 'react';

import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { render } from '@testing-library/react';
import { RESOURCE_TYPES } from '../../src/constants/ui';
import CardHeader from '../../src/components/Card/CardHeader';

describe('Card Header Component', () => {
  it('shows an external link icon when linksToExternal is passed in as true', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CardHeader resourceType={RESOURCE_TYPES.COMPONENTS} linksToExternal />
      </ThemeProvider>,
    );

    expect(container.getElementsByTagName('svg').length).toBe(2);
  });
});
