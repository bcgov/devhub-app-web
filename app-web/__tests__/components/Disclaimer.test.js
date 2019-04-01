import React from 'react';
import { render } from 'react-testing-library';
import { wrapWithTheme } from '../helpers';
import Disclaimer from '../../src/components/Disclaimer/Disclaimer';

describe('Disclaimer Component', () => {
  const props = {
    onClose: jest.fn(),
    toggle: jest.fn(),
    open: true,
  };

  it('matches snapshot', () => {
    const { container } = wrapWithTheme(render, <Disclaimer {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
