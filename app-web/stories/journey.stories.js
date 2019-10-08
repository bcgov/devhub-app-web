import React from 'react';

import { storiesOf } from '@storybook/react';
import { Station } from '../src/components/Journey';

storiesOf('Journeys', module)
  .add('A Station', () => <Station name="edmonds" variant="up" />)
  .add('A Station (with custom color)', () => <Station color="green" name="edmonds" variant="up" />)
  .add('A Station (with down variant)', () => <Station color="red" name="edmonds" variant="down" />)
  .add('A Station (with long name, variant down)', () => (
    <Station
      color="red"
      name="The Meaning of Life and Everything Is not 42 (big surprise)"
      variant="down"
    />
  ))
  .add('A Station (with long name, variant up)', () => (
    <Station color="red" name="The Meaning of Life and Everything Is not 42 (big surprise)" />
  ))
  .add('Stations side by side', () => (
    <div style={{ display: 'flex', height: '500px', alignItems: 'center' }}>
      <Station
        color="red"
        name="The Meaning of Life and Everything Is not 42 (big surprise)"
        variant="down"
      />
      <Station color="blue" name="Nanaimo" variant="up" />
      <Station color="red" name="Patterson" variant="down" />
      <Station color="green" name="Metrotown" variant="up" />
    </div>
  ));
