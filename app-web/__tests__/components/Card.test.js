import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../src/components/Cards/Card/Card';
import validURL from 'valid-url';
jest.mock('valid-url', () => ({
  isWebUri: jest.fn(() => true),
}));

describe('Card Component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <Card title="title" description="description" resourceType="resourceType" link="fofofo" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("doesn't render the resource type when not provided", () => {
    validURL.isWebUri.mockImplementation(() => true);
    const wrapper = shallow(
      <Card title="title" description="description" link="https://google.com" />,
    );

    expect(wrapper.find('.ResourceType').length).toBe(0);
  });

  it('renders an external link icon besides the resource type when link is a web uri', () => {
    validURL.isWebUri.mockImplementation(() => true);
    const wrapper = shallow(
      <Card
        title="title"
        description="description"
        resourceType="resourceType"
        link="https://google.com"
      />,
    );

    expect(wrapper.find('.ResourceType small').length).toBe(1);
  });
});
