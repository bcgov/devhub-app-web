import React, { Component } from 'react';

class Learn extends Component {
  componentDidMount() {
    // for now we will auto click the anchor tag to navigate to pathfinder website;
    this.anchor.click();
  }

  render() {
    return (
      <div>
        <a
          href="https://www.pathfinder.gov.bc.ca"
          ref={a => (this.anchor = a)}
        />
        <h1>Redirecting</h1>
      </div>
    );
  }
}

export default Learn;
