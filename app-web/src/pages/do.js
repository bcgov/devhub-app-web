import React, { Component } from 'react';
import Link from 'gatsby-link';
import { HOME_ROUTE } from '../constants/routes';
// local components
class Do extends Component {
  render() {
    return (
      <main role="main" className="main">
        <h1>Do</h1>
        <h2>Signing Tool</h2>
        <p>
          The Signing Tool application is currently in development. Please check back soon!
          <Link to={HOME_ROUTE}> Go Back</Link>.
        </p>
      </main>
    );
  }
}

export default Do;
