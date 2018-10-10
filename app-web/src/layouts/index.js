import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
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
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
// redux & auth
import implicitAuthManager from '../auth';
import * as actions from '../store/actions/actions';

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
    if(this.props.useAuth) {
      implicitAuthManager.registerHooks({
        onAuthenticateSuccess: () => this.props.login(),
        onAuthenticateFail: () => this.props.logout(),
        onAuthLocalStorageCleared: () => this.props.logout(),
      });
      if (window.location.origin.indexOf('localhost') < 0) {
        implicitAuthManager.handleOnPageLoad();
      }
    }
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
  useAuth: PropTypes.bool.isRequired,
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

const mapStateToProps = state => {
  return {
    useAuth: state.flags.features.login
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
