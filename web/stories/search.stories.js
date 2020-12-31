import React from 'react';
import { storiesOf } from '@storybook/react';
import AlgoliaBrand from '../src/components/UI/AlgoliaBrand';

storiesOf('Search Branding', module)
  .add('Algolia brand', () => <AlgoliaBrand title="Search" />)
  .add('Branding with border', () => (
    <AlgoliaBrand title="Search" style={{ border: '5px solid red' }} />
  ))
  .add('Flex box Container', () => (
    <div style={{ display: 'flex' }}>
      <AlgoliaBrand title="Search" />
    </div>
  ));
