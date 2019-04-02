import React from 'react';
import 'jest-dom/extend-expect';
import { render, waitForElement } from 'react-testing-library';
import { useSearch } from '../../src/utils/hooks';
import { Index } from 'elasticlunr';

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
    jest.doMock('elasticlunr');
    // mock out load function, this returns a
    // mock Elastic Lunr Index instance
    Index.load = jest.fn(() => ({
      search: jest.fn(() => [{ ref: '1' }]),
      documentStore: {
        getDoc: jest.fn(ref => ({ id: '1', title: 'foo' })),
      },
    }));

    it('returns results inside a component after a search', async () => {
      // create a stub component, this is the only way
      // we can test hooks
      const Component = () => {
        const results = useSearch();
        if (results !== null) {
          return <p>{results[0].title}</p>;
        }
        return null;
      };
      const { findByText } = render(<Component />);
      expect(Index.load).toHaveBeenCalled();
      // wait for element
      const searchResultPTag = await waitForElement(() => findByText('foo'));
      expect(searchResultPTag).toBeInTheDocument();
    });
  });
});
