import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faPuzzlePiece,
  faFile,
  faTools,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/fontawesome-free-brands';

import { RESOURCE_TYPES } from '../../src/constants/ui';
import CardHeader from '../../src/components/Cards/Card/CardHeader';

import { mountWithTheme } from '../helpers';
describe('Card Header Component', () => {
  it('renders a puzzle piece when component is passed in as type', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.COMPONENTS} />);

    const icon = wrapper.find(FontAwesomeIcon).prop('icon');
    expect(icon).toEqual(faPuzzlePiece);
  });

  it('renders a file when documentaiton is passed in as type', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.DOCUMENTATION} />);

    const icon = wrapper.find(FontAwesomeIcon).prop('icon');
    expect(icon).toEqual(faFile);
  });

  it('renders a user when people is passed in as type', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.PEOPLE} />);

    const icon = wrapper.find(FontAwesomeIcon).prop('icon');
    expect(icon).toEqual(faUserCircle);
  });

  it('renders a tool when self service tools is passed in as type', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.SELF_SERVICE_TOOLS} />);

    const icon = wrapper.find(FontAwesomeIcon).prop('icon');
    expect(icon).toEqual(faTools);
  });

  it('renders github logo when repositories is passed in as type', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.REPOSITORIES} />);

    const icon = wrapper.find(FontAwesomeIcon).prop('icon');
    expect(icon).toEqual(faGithub);
  });

  it('renders stacked layers when collection is passed in as type', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.COLLECTIONS} />);

    const icon = wrapper.find(FontAwesomeIcon).prop('icon');
    expect(icon).toEqual(faLayerGroup);
  });

  it('shows an external link icon when linksToExternal is passed in as true', () => {
    const wrapper = mountWithTheme(<CardHeader type={RESOURCE_TYPES.COMPONENTS} linksToExternal />);
    expect(wrapper.find(FontAwesomeIcon).length).toBe(2);
  });
});
