import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faPuzzlePiece,
  faFile,
  faTools,
  faLayerGroup,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import { RESOURCES } from '../../src/messages';
import { RESOURCE_TYPES, RESOURCE_TYPES_LIST } from '../../src/constants/ui';
import CardHeader from '../../src/components/Cards/Card/CardHeader';

import { shallow } from 'enzyme';
describe('Card Header Component', () => {
  it('renders a puzzle piece when component is passed in as type', () => {
    const wrapper = shallow(<CardHeader type={RESOURCE_TYPES.COMPONENT} />);

    const icon = wrapper.find(FontAwesomeIcon);
    console.log(icon);
    console.log('card header');
  });
});
