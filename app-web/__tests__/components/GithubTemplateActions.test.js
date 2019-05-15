import React from 'react';
import { shallow } from 'enzyme';

import Actions, { IDS } from '../../src/components/GithubTemplate/Actions/Actions';

describe('Github Resource Page Actions', () => {
  const props = {
    repo: 'foo',
    owner: 'bar',
    pageTitle: 'About',
    originalSource: '/about.md',
    devhubPath: 'blarb',
  };

  it('creates a link to the appropriate github repo issue page with params', () => {
    const wrapper = shallow(<Actions {...props} />);
    const link = wrapper.find(`#${IDS.issue}`);

    expect(link.prop('to')).toBe(
      `https://www.github.com/bar/foo/issues/new?title=Devhub%20Issue%3A%20About%20%5Bshort%20description%20here%5D&body=%3E%20path%3A%20(do%20not%20delete)%20%2Fabout.md%0A%20%3E%20(do%20not%20delete)%20devhub%20page%3A%20blarb%0A%0A%23%23%20Devhub%20Content%20Issue%0A`,
    );
  });
});
