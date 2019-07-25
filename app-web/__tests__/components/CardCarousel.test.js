import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import CardCarousel, { TEST_IDS } from '../../src/components/CardCarousel/CardCarousel';
import { RESOURCE_TYPES } from '../../src/constants/ui';

// mock out card components
jest.mock('../../src/components/Cards/Card/Card.js', () => () => <div>card</div>);

describe('Card Carousel', () => {
  afterEach(cleanup);

  const resources = [
    {
      id: 'foo',
      type: RESOURCE_TYPES.DOCUMENTATION,
      fields: {
        title: 'foo',
        description: 'bar',
      },
      path: '/foo',
    },
  ];

  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CardCarousel resources={resources} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not show any arrows if there are not enough components to go make another page', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <CardCarousel resources={resources} />
      </ThemeProvider>,
    );

    expect(queryByTestId(TEST_IDS.arrowLeft)).not.toBeInTheDocument();
    expect(queryByTestId(TEST_IDS.arrowRight)).not.toBeInTheDocument();
  });

  it('shows the right arrow if there are more than 3 resources when clicked the right arrow disappears since there are no more pages to goto and the left one shows up', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <CardCarousel
          resources={resources
            .concat(resources)
            .concat(resources)
            .concat(resources)}
        />
      </ThemeProvider>,
    );

    const RightArrow = queryByTestId(TEST_IDS.arrowRight);
    const LeftArrow = queryByTestId(TEST_IDS.arrowLeft);

    expect(LeftArrow).not.toBeInTheDocument();
    expect(RightArrow).toBeInTheDocument();

    fireEvent.click(RightArrow);
    // wait for re renders to happen
    expect(queryByTestId(TEST_IDS.arrowRight)).not.toBeInTheDocument();
    expect(queryByTestId(TEST_IDS.arrowLeft)).toBeInTheDocument();
  });
});
