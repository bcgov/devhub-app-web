import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { useSearch } from '../../src/utils/hooks';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// mock out elastic lunr search index

describe('React Hooks', () => {
  describe('useSearch', () => {
    // mock out load function, this returns a
    // mock ALGOLIA Index instance

    it.skip('returns results inside a component after a search', async () => {
      // create a stub component, this is the only way
      // we can test hooks
      // https://reactjs.org/blog/2019/02/06/react-v16.8.0.html
      const Component = () => {
        const results = useSearch('query');

        if (results !== null) {
          return <p>{results[0].field.title}</p>;
        }
        return null;
      };
      const { findByText } = render(<Component />);
      // wait for element
      const searchResultPTag = await waitForElement(() => findByText('foo'));
      expect(searchResultPTag).toBeInTheDocument();
    });
  });
});
