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
        <p className={classes.Para}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          imperdiet ullamcorper massa, eget venenatis mauris sagittis ut. Nunc
          rutrum libero consequat turpis faucibus semper. In hac habitasse
          platea dictumst. Vivamus vel imperdiet lacus, quis euismod sapien.
          Vivamus quis volutpat lorem. Ut in turpis nec erat interdum interdum.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam
          sagittis id ipsum vitae semper. Aenean sit amet euismod leo. Curabitur
          nec erat nisi. Ut sapien lorem, consequat molestie dignissim vel,
          maximus vel metus. Mauris at gravida neque.
        </p>
        <NavigationalItems navItems={links} />
      </main>
    );
  }
}

export default Index;
