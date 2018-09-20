import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Index.module.css';
// local components
import NavigationalItems from '../components/Navigation/NavigationalItems/NavigationalItems';
import { LEARN_ROUTE, DO_ROUTE, DELIVER_ROUTE } from '../constants/routes';

const links = [
  {
    link: LEARN_ROUTE,
    title: 'Learn',
    icon: 'book',
    description: 'Learn more about the Pathfinder initiative',
  },
  {
    link: DO_ROUTE,
    title: 'Do',
    icon: 'user-astronaut',
    description: 'Use the Signing Tool',
  },
  {
    link: DELIVER_ROUTE,
    title: 'Deliver',
    icon: 'shipping-fast',
    description:
      'this is a description describing what this block is all about',
  },
];

class Index extends Component {
  render() {
    return (
      <main role="main" className={classes.Main}>
        <h1>Welcome</h1>
        <h2>
          <em>We are here to help</em>
        </h2>
        <p className={classes.Para}>
          This is the front door to the developer community of the BC
          Government. We’re embarking on a journey to help developers learn new
          skills, discover resources and create amazing applications for
          government.
        </p>
        <p className={classes.Para}>
          This is our first release and we’re planning to have new material
          added to this site every sprint (2 weeks), so please visit often to
          check our progress.
        </p>
        <p className={classes.Para}>
          {' '}
          If you’d like to comment, offer a suggestion or ask a question you can
          find us by opening an issue in our github.com repository.
        </p>
        <NavigationalItems navItems={links} />
      </main>
    );
  }
}

export default Index;
