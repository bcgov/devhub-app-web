import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// stylesheets
import '../assets/styles/index.css';
// layout local componenets
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
// redux & auth
import { create_iam } from '../auth';
import * as actions from '../store/actions/actions';

class Layout extends React.Component {
  componentDidMount() {
    const implicitAuthManager = create_iam();
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
    const { children, path } = this.props;
    return (
      <div>
        <Helmet>
          <link
            href="https://portal.nrs.gov.bc.ca/nrs-portal-theme/images/favicon.ico"
            rel="icon"
            type="image/x-icon"
          />
        </Helmet>
        <PrimaryHeader path={path}/>
        <div className="container">{children}</div>
        <PrimaryFooter />
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
