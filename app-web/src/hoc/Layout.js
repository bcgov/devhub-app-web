import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// stylesheets
import '../assets/styles/index.css';
import '../assets/styles/page.css';
// layout local componenets
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
// redux & auth
import { implicitAuthManager } from '../../gatsby-browser';
import * as actions from '../store/actions/actions';

class Layout extends React.Component {
  componentDidMount() {
    if (this.props.useAuth) {
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
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <link
            href="https://portal.nrs.gov.bc.ca/nrs-portal-theme/images/favicon.ico"
            rel="icon"
            type="image/x-icon"
          />
        </Helmet>
        <PrimaryHeader />
        <div className="container">{children}</div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  useAuth: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.authenticateSuccess()),
  logout: () => dispatch(actions.authenticateFailed()),
});

const mapStateToProps = state => ({
  useAuth: state.flags.features.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
