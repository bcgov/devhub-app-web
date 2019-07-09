import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RESOURCE_TYPES } from '../../src/constants/ui';
import CardHeader from '../../src/components/Cards/Card/CardHeader';

import { mountWithTheme } from '../helpers';
describe('Card Header Component', () => {
  it('shows an external link icon when linksToExternal is passed in as true', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.COMPONENTS} linksToExternal />);
    expect(wrapper.find(FontAwesomeIcon).length).toBe(2);
  });
});
