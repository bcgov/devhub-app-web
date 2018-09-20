import React, { Component } from 'react';
import Link from 'gatsby-link';
import { HOME_ROUTE } from '../constants/routes';
// local components
class Deliver extends Component {
  render() {
    return (
      <main role="main" className="main">
        <h1>Deliver</h1>
        <p>
          This section is currently in development. Please check back soon!
          <Link to={HOME_ROUTE}>Go Back</Link>.
        </p>
      </main>
    );
  }
}

export default Deliver;
