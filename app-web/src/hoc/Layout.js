import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Flag } from 'flag';
// layout local componenets
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import Navbar from '../components/Navbar/Navbar';
// redux & auth
// factory for implicit auth manager instance
import { create_iam } from '../auth';
import * as actions from '../store/actions/actions';
import FLAGS from '../constants/featureflags';

const Wrapper = styled.div`
  margin-top: 65px;
  flex-grow: 1;
  @media (min-width: 767px) {
    margin-top: 112px;
  }
`;

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
    const { children, toggleMenu, showMenu } = this.props;

    return (
      <Container
        fluid
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}
      >
        <PrimaryHeader showHamburger hamburgerClicked={toggleMenu} />
        <Flag name={`features.${FLAGS.SOURCE_FILTERING}`}>
          <Navbar />
          {showMenu && <Navbar mobile />}
        </Flag>
        <Wrapper>{children}</Wrapper>
        <PrimaryFooter />
      </Container>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  useAuth: PropTypes.bool.isRequired,
  login: PropTypes.func,
  logout: PropTypes.func,
  toggleMenu: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  showHamburger: false,
  useAuth: false,
  login: () => null,
  logout: () => null,
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.authenticateSuccess()),
  logout: () => dispatch(actions.authenticateFailed()),
  toggleMenu: () => dispatch(actions.toggleMainNavigation()),
});

const mapStateToProps = state => ({
  useAuth: state.flags.features.login,
  showMenu: state.ui.mainNavigationToggled,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
