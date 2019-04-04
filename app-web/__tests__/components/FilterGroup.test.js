import React from 'react';
import { render, waitForElement, cleanup, fireEvent } from 'react-testing-library';
import { wrapWithTheme } from '../helpers';
import { FilterGroup, TEST_IDS } from '../../src/components/Filters/FilterGroup/FilterGroup';
import DEFAULT_FILTERS, { FILTER_QUERY_PARAM } from '../../src/constants/filterGroups';
import { navigate } from 'gatsby';
jest.mock('gatsby');

describe('FilterGroup Component', () => {
  afterEach(cleanup);

  const props = {
    title: 'Filter Group',
    filters: DEFAULT_FILTERS,
    location: {
      search: '',
      pathname: '/foo/',
    },
  };

  const firstFilterKey = DEFAULT_FILTERS[0].key;

  it('matches snapshot and when the search is empty (?f= null), clicking on a checkbox calls navigate with /foo/?f=[key]', () => {
    const { container, getByTestId } = render(<FilterGroup {...props} />);

    expect(container.firstChild).toMatchSnapshot();

    const Checkbox = getByTestId(`${TEST_IDS.checkbox}-${firstFilterKey}`);

    expect(navigate).not.toHaveBeenCalled();

    fireEvent.click(Checkbox);

    expect(navigate).toHaveBeenCalledWith(
      `${props.location.pathname}?${FILTER_QUERY_PARAM}=${firstFilterKey}`,
    );
  });

  it('remove the filter key from the search menu if it already exists', () => {
    navigate.mockReset();
    const { getByTestId } = render(
      <FilterGroup
        {...props}
        location={{
          ...props.location,
          search: `?${FILTER_QUERY_PARAM}=${firstFilterKey}`,
        }}
      />,
    );

    const Checkbox = getByTestId(`${TEST_IDS.checkbox}-${firstFilterKey}`);

    expect(navigate).not.toHaveBeenCalled();

    fireEvent.click(Checkbox);

    expect(navigate).toHaveBeenCalledWith(`${props.location.pathname}`);
  });
});
