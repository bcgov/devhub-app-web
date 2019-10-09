import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { Station, SubwayLine, JunctionList } from '../src/components/Journey';

storiesOf('Journeys', module)
  .add('A Station', () => <Station name="edmonds" variant="up" />)
  .add('A Station (with custom color)', () => <Station color="green" name="edmonds" variant="up" />)
  .add('A Station (with down variant)', () => <Station color="red" name="edmonds" variant="down" />)
  .add('A Station (with long name, variant down)', () => (
    <React.Fragment>
      <br />
      <Station
        color="red"
        name="The Meaning of Life and Everything Is not 42 (big surprise)"
        variant="down"
      />
    </React.Fragment>
  ))
  .add('A Station (with long name, variant up)', () => (
    <React.Fragment>
      <Station color="red" name="The Meaning of Life and Everything Is not 42 (big surprise)" />
    </React.Fragment>
  ))
  .add('Station with name as render prop', () => (
    <React.Fragment>
      <Station
        color="red"
        variant="down"
        name={() => {
          const [toggled, setToggled] = useState(false);
          return (
            <div>
              <button onClick={() => setToggled(!toggled)}>click me!</button>
              {toggled && <p>AWH YEAH</p>}
            </div>
          );
        }}
      />
    </React.Fragment>
  ))
  .add('Station with Auxillary field, (leveraing renderProp)', () => (
    <div style={{ display: 'flex', height: '500px', alignItems: 'center', width: '500px' }}>
      <Station
        style={{ width: 150 }}
        color="red"
        name="The Meaning of Life and Everything Is not 42 (big surprise)"
        render={() => <p>aux</p>}
      />
      <Station
        style={{ width: 150 }}
        color="red"
        variant="down"
        name="The Meaning of Life and Everything Is not 42 (big surprise)"
        render={() => <p>aux</p>}
      />
    </div>
  ))
  .add('Stations side by side', () => (
    <div style={{ display: 'flex', height: '500px', alignItems: 'center', width: '500px' }}>
      <Station
        color="red"
        name="The Meaning of Life and Everything Is not 42 (big surprise)"
        variant="down"
        style={{ width: 150 }}
      />
      <Station color="blue" name="Nanaimo" variant="up" style={{ width: 150 }} />
      <Station color="red" name="Patterson" variant="down" style={{ width: 150 }} />
      <Station color="green" name="Metrotown" variant="up" style={{ width: 150 }} />
    </div>
  ))
  .add('Subway Line', () => (
    <div style={{ padding: '50px', width: '550px' }}>
      <SubwayLine
        stops={[
          { name: 'Yaletown Roundhouse' },
          { name: 'Olympic Village' },
          { name: 'Broadway City Hall' },
          { name: 'King Edward' },
          { name: 'Oakridge 41st' },
          { name: 'Oakridge 41st' },
        ]}
        color="green"
      />
    </div>
  ))
  .add('Junction List', () => (
    <div style={{ padding: '50px', width: '550px' }}>
      <JunctionList
        links={[
          { name: 'foo', to: 'text' },
          { name: 'foo', to: 'text' },
          { name: 'foo', to: 'text' },
        ]}
      />
      <JunctionList
        variant="down"
        links={[
          { name: 'foo', to: 'text' },
          { name: 'foo', to: 'text' },
          { name: 'foo', to: 'text' },
        ]}
      />
    </div>
  ))
  .add('Subway with Junctions Noted', () => (
    <div style={{ padding: '50px', width: '50%' }}>
      <SubwayLine
        stops={[
          { name: 'Yaletown Roundhouse' },
          { name: 'Olympic Village' },
          {
            name: 'Broadway City Hall',
            connectsWith: [
              { resourceType: 'Topics', name: 'billy', path: '/topic' },
              { resourceType: 'Topics', name: 'is cool', path: '/topic' },
              {
                resourceType: 'Topics',
                name: "isn't that right? wouldn't you say?",
                path: '/topic',
              },
              {
                resourceType: 'Topics',
                name: "isn't that right? wouldn't you say?",
                path: '/topic',
              },
            ],
          },
          {
            name: 'King Edward',
            connectsWith: [
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
            ],
          },
          { name: 'Oakridge 41st' },
          {
            name: 'Langara 49th',
            connectsWith: [
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
            ],
          },
          {
            name: 'Marine Drive',
          },
        ]}
        color="lightblue  "
      />
    </div>
  ));
