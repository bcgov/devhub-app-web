import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import {
  Station,
  SubwayLine,
  JunctionList,
  SubwayLegend,
  JourneyMap,
} from '../src/components/Journey';

storiesOf('Journeys', module)
  .add('Subway Introduction', () => (
    <article>
      <h2>Journey/Subway Analogy</h2>
      <p>
        The Subway UI element is meant to represent a set of graphql nodes in a defined and linear
        way
      </p>
      <p>
        The concept of a station
        <Station
          color="blue"
          name="Station"
          href={`./${window.location.search}`}
          variant="up"
          style={{ marginTop: '10px', width: 150, display: 'inline-block' }}
        />
        allows to identify a single point in the journey.
      </p>
      <p>
        All the <b>'Subway'</b> React Components are designed to be composed together and behave
        more or less like a framework
      </p>
      <p>
        Multiple Stations are joined together in a subway line. The initial behavior of how the user
        will interact with this subway map is still to be determined
      </p>

      <p>
        When a station is related to other graphql nodes, for example if a station is pointing to a
        content node that is in multiple topics, there is a possability to represent these other
        connections with the <code>connections</code> property. They be represented with a junction
        list.{' '}
      </p>
      <JunctionList
        links={[
          { resourceType: 'Documentation', name: 'foo', to: 'text' },
          { resourceType: 'Documentation', name: 'foo', to: 'text' },
          { resourceType: 'Documentation', name: 'foo', to: 'text' },
        ]}
      />

      <h3>Putting It All Together</h3>

      <p>
        As you will see below, the configuration for a subway line is codefied as JSON and passed
        into the
        <code> &lt;SubwayLine&gt;</code> Component as the <code>stops</code> prop
      </p>
      <h4>JSON example</h4>
      <pre>
        <code>
          {`[
        { name: 'Yaletown Roundhouse' },
        { name: 'Olympic Village' },
        {
          name: 'Broadway City Hall',
          connections: [
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
          connections: [
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
          ],
        },
        { name: 'Oakridge 41st' },
        {
          name: 'Langara 49th',
          connections: [
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
          ],
        },
        {
          name: 'Marine Drive',
        },
      ]`}
        </code>
      </pre>
    </article>
  ))
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
  .add('Junction List (with renderLink render prop)', () => (
    <div style={{ padding: '50px', width: '550px' }}>
      <JunctionList
        renderLink={link => <button>{link.name}</button>}
        links={[
          { name: 'foo', to: 'text' },
          { name: 'foo', to: 'text' },
          { name: 'foo', to: 'text' },
        ]}
      />
      <JunctionList
        variant="down"
        renderLink={link => <button>{link.name}</button>}
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
            connections: [
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
            connections: [
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
            ],
          },
          { name: 'Oakridge 41st' },
          {
            name: 'Langara 49th',
            connections: [
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
              { resourceType: 'Topics', name: 'foo', path: '/topic' },
            ],
          },
          {
            name: 'Marine Drive',
          },
        ]}
        color="lightblue"
      />
    </div>
  ))
  .add('Subway Legend', () => <SubwayLegend />)
  .add('Journey', () => (
    <JourneyMap
      title="How to Developer"
      link={{ to: '/', text: 'get started' }}
      stops={[
        { name: 'Yaletown Roundhouse' },
        { name: 'Olympic Village' },
        {
          name: 'Broadway City Hall',
          connections: [
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
          connections: [
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
          ],
        },
        { name: 'Oakridge 41st' },
        {
          name: 'Langara 49th',
          connections: [
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
            { resourceType: 'Topics', name: 'foo', path: '/topic' },
          ],
        },
        {
          name: 'Marine Drive',
        },
      ]}
    />
  ));
