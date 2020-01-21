import React from 'react';
import { storiesOf } from '@storybook/react';
import AlgoliaLogo from '../src/components/UI/AlgoliaBranding/AlgoliaBranding';

storiesOf('Search Branding', module)
  .add('Algolia brand', () => <AlgoliaLogo title="Search" />)
  .add('Branding with border', () => (
    <AlgoliaLogo title="Search" style={{ border: '5px solid red' }} />
  ))
  .add('Flex box Container', () => (
    <div style={{ display: 'flex' }}>
      <AlgoliaLogo title="Search" />
    </div>
  ));
