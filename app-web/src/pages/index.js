import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
// local components
import NavigationalItems from '../components/Navigation/NavigationalItems/NavigationalItems';
import links from '../mainNavigation';
import { GITHUB_ISSUES_ROUTE } from '../constants/routes';
import { ImplicitAuthManager } from '@bcgov/common-web-utils';

import {
    SSO_BASE_URL,
    SSO_CLIENT_ID,
    SSO_REALM_NAME,
} from '../constants/api';


class Index extends Component {
  componentDidMount() {
    console.log(this.props);
    const config = {
        baseURL: SSO_BASE_URL,
        clientId: SSO_CLIENT_ID,
        realmName: SSO_REALM_NAME,
        hooks: {
          onAuthenticateSuccess: () => this.props.login(),
          onAuthenticateFail: () => this.props.logout(),
        }
    }

    const implicitAuthManager = new ImplicitAuthManager(config);
    implicitAuthManager.handleOnPageLoad();
  }

  render() {
    return (
      <main role="main" className="main">
        <h1>Welcome</h1>
        <h2>
          <em>We are here to help</em>
        </h2>
        <p className="para">
          This is the front door to the developer community of the BC
          Government. We’re embarking on a journey to help developers learn new
          skills, discover resources and create amazing applications for
          government.
        </p>
        <p className="para">
          This is our first release and we’re planning to have new material
          added to this site every sprint (2 weeks), so please visit often to
          check our progress.
        </p>
        <p className="para">
          {' '}
          If you’d like to comment, offer a suggestion or ask a question you can
          find us by opening an issue in our{' '}
          <a href={GITHUB_ISSUES_ROUTE}>github.com</a> repository.
        </p>
        <NavigationalItems navItems={links} />
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.authenticateSuccess()),
  logout: () => dispatch(actions.authenticateFailed()),
});

export default connect(null, mapDispatchToProps)(Index);
