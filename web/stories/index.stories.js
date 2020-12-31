import React from 'react';

import { storiesOf } from '@storybook/react';
import { NavContainer, NavLink, NavList, Navbar } from '../src/components/Navbar/Navbar';

storiesOf('Introduction', module).add('Start', () => (
  <p>
    Welcome to Storybook, it may be best to google Storybook to understand what it is and how it
    works. <br />
    That being said, the purpose of our storybook is to visually demonstrate/test components as well
    as show how they are created (code snippets). Please Note that all code snippets will show some
    boiler plate which includes any relevant providers and other higher order components
  </p>
));

storiesOf('Navigation', module)
  .add('NavContainer', () => <NavContainer style={{ padding: '20px' }} />)
  .add('NavLink', () => <NavLink>Hello world</NavLink>)
  .add('NavLink (active)', () => <NavLink className="active">Hello world</NavLink>)
  .add('Navlink in a row', () => (
    <NavContainer>
      <NavLink>Hello world</NavLink>
      <NavLink>Hello world</NavLink>
      <NavLink className="active">Hello world</NavLink>
      <NavLink>Hello world</NavLink>
      <NavLink>Hello world</NavLink>
    </NavContainer>
  ))
  .add('NavList', () => (
    <NavContainer>
      <NavList>
        <li>
          <NavLink>hello</NavLink>
        </li>
        <li>
          <NavLink className="active">hello</NavLink>
        </li>
      </NavList>
    </NavContainer>
  ))
  .add('NavBar', () => (
    <Navbar
      links={[
        { to: '/', text: 'home' },
        { to: '/', text: 'topics' },
        { to: '/', text: 'journeys' },
        { to: '/', text: 'documentation' },
        { to: '/', text: 'repositories' },
        { to: '/', text: 'components' },
        { to: '/', text: 'events' },
      ]}
      authenticated
      toggled
    />
  ));
