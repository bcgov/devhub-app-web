import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import NavigationalItems from '../components/Navigation/NavigationalItems/NavigationalItems';

const links = [
  {
    link: 'https://www.pathfinder.gov.bc.ca',
    title: 'Learn',
    icon: 'book',
    description: 'Learn more about the Pathfinder initiative',
  },
  {
    link: '/do',
    title: 'Do',
    icon: 'user-astronaut',
    description: 'Use the Signing Tool',
  },
  {
    link: '/deliver',
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
