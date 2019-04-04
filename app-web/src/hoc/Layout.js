import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Container } from 'reactstrap';
// layout local componenets
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import Navbar from '../components/Navbar/Navbar';

const Wrapper = styled.div`
  margin-top: 65px;
  flex-grow: 1;
  ${props => props.theme.breakpoints.main.desktop} {
    margin-top: 112px;
  }
`;

export class Layout extends React.Component {
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

        <Navbar />
        {showMenu && <Navbar mobile />}

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

export default Layout;
