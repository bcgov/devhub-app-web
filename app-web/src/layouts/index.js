import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import implicitAuthManager from '../auth';
// local sourced fonts
import * as fonts from '../assets/fonts/fonts';
/* eslint-disable */
// font awesome loading
import '../utils/fontAwesomeLibrary';
// stylesheets
import normalize from 'normalize.css';
import '../assets/styles/index.css';
import '../assets/styles/fonts.css';
import '../assets/styles/page.css';
// layout local componenets
import * as actions from '../store/actions/actions';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';

import { SSO_BASE_URL, SSO_CLIENT_ID, SSO_REALM_NAME } from '../constants/api';

injectGlobal`
  @font-face {
    font-family: 'Myriad-Pro';
    src: local('Myriad-Pro'), url('${fonts.MyriadWebProWoff}') format('woff'),
    url('${fonts.MyriadWebProWoff2}') format('woff2'),
    url('${fonts.MyriadWebProTtf}') format('truetype');
  }
`;

class Layout extends React.Component {
  componentDidMount() {
    implicitAuthManager.registerHooks({
      onAuthenticateSuccess: () => this.props.login(),
      onAuthenticateFail: () => this.props.logout(),
      onAuthLocalStorageCleared: () => this.props.logout(),
    });
    implicitAuthManager.handleOnPageLoad();
  }

  render() {
    const { data, children } = this.props;
    return (
      <div>
        <Helmet>
          <title>{data.site.siteMetadata.title}</title>
          <link
            href="https://portal.nrs.gov.bc.ca/nrs-portal-theme/images/favicon.ico"
            rel="icon"
            type="image/x-icon"
          />
        </Helmet>
        <PrimaryHeader />
        <div className="container">{children()}</div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.func.isRequired,
};

export const LayoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.authenticateSuccess()),
  logout: () => dispatch(actions.authenticateFailed()),
});

export default connect(null, mapDispatchToProps)(Layout);
