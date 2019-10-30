import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import PopularTopic from '../../src/components/PopularTopic';
import { GITHUB_RAW_1, GITHUB_RAW_2 } from '../../__fixtures__/nodes';

describe('PopularTopic', () => {
  it('matches snapshot', () => {
    const nodes = [GITHUB_RAW_1, GITHUB_RAW_2];

    const { container } = render(
      <ThemeProvider theme={theme}>
        <PopularTopic nodes={nodes} />
      </ThemeProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
