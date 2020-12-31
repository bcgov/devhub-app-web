import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
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
  const secondFilterKey = DEFAULT_FILTERS[1].key;

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

  it('it does not call navigate unless a checkbox has been clicked', () => {
    navigate.mockReset();
    render(
      <FilterGroup
        {...props}
        location={{
          ...props.location,
          search: `?${FILTER_QUERY_PARAM}=${firstFilterKey}`,
        }}
      />,
    );

    expect(navigate).not.toHaveBeenCalled();
  });

  it('removes the filter key from the search string if it already exists and adds a search key in the pattern f=[key1]&f=[key2] if the key does not already exist', () => {
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

    // get first checkbox and click it
    const Checkbox = getByTestId(`${TEST_IDS.checkbox}-${firstFilterKey}`);

    fireEvent.click(Checkbox);
    // navigate should be called with that checkboxes 'key' not included
    expect(navigate).toHaveBeenCalledWith(`${props.location.pathname}`);

    // there is no prop change so the FilterGroup still has the search prop for ?f=firstFilter
    // we get the second checkbox and click that
    const SecondCheckbox = getByTestId(`${TEST_IDS.checkbox}-${secondFilterKey}`);

    fireEvent.click(SecondCheckbox);
    // should expect both filters to exist as filter params in the url
    expect(navigate).toHaveBeenCalledWith(
      `${props.location.pathname}?${FILTER_QUERY_PARAM}=${firstFilterKey}&${FILTER_QUERY_PARAM}=${secondFilterKey}`,
    );
  });
});
