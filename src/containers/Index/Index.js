import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavigationalItems from '../../components/Navigation/NavigationalItems/NavigationalItems';

const links = ['Learn', 'Do', 'Deliver'];

class Index extends Component {
  render() {
    return (
      <main role="main">
        <p>
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
