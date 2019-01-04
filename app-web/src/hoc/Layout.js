import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flag } from 'flag';
import FLAGS from '../constants/featureflags';
// stylesheets
import '../assets/styles/index.css';
// layout local componenets
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import PrimaryFilter from '../components/PrimaryFilter/PrimaryFilter';
import Dropmenu from '../components/Dropmenu/Dropmenu';

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
    const { children, toggleMenu } = this.props;

    return (
      <div className="layout">
        <PrimaryHeader showHamburger hamburgerClicked={toggleMenu} />
        <Flag name={`features.${FLAGS.SOURCE_FILTERING}`}>
          <PrimaryFilter />
        </Flag>
        {/* hamburger icon controlled menu */}
        <Dropmenu menuToggled />

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
  toggleMenu: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  showHamburger: false,
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.authenticateSuccess()),
  logout: () => dispatch(actions.authenticateFailed()),
  toggleMenu: () => dispatch(actions.toggleMainNavigation()),
});

const mapStateToProps = state => ({
  useAuth: state.flags.features.login,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
