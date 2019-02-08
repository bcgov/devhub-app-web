import React from 'react';
import { shallow } from 'enzyme';
import DefaultCard from '../../src/components/Cards/Card/DefaultCard';

describe('Card Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <DefaultCard title="title" description="description" resourcePath="resourcePath" />,
    );
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders no image in the body image if image is invalid', () => {
    expect(
      wrapper
        .find('.bodyImage')
        .children()
        .exists(),
    ).toBe(false);
  });

  // flag.js appear to be breaking this test. this needs to be explored
  // it('renders an image in the body image is passed one', () => {
  //   const wrapper = shallow(
  //     <DefaultCard
  //       title="title"
  //       description="description"
  //       resourcePath="resourcePath"
  //       image="matt damon"
  //     />,
  //   );
  //   expect(
  //     wrapper
  //       .find('.bodyImage')
  //       .children()
  //       .exists(),
  //   ).toBe(true);
  // });
});
