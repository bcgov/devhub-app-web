import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// stylesheets
import '../assets/styles/index.css';
// layout local componenets
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
// redux & auth
import { create_iam } from '../auth';
import * as actions from '../store/actions/actions';

export class Layout extends React.Component {
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
    const { children, hamburgerClicked } = this.props;
    return (
      <div className="layout">
        <PrimaryHeader showHamburger hamburgerClicked={hamburgerClicked} />
        {children}
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
  showHamburger: PropTypes.bool,
  hamburgerClicked: PropTypes.func,
};

Layout.defaultProps = {
  showHamburger: false,
  hamburgerClicked: () => undefined,
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.authenticateSuccess()),
  logout: () => dispatch(actions.authenticateFailed()),
});

const mapStateToProps = state => ({
  useAuth: state.flags.features.login,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
