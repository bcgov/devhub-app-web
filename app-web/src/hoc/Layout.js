import React, { useState } from 'react';
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

const Layout = ({ children }) => {
  const [menuToggled, setMenuToggled] = useState(false);

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
      <PrimaryHeader showHamburger hamburgerClicked={() => setMenuToggled(!menuToggled)} />

      <Navbar />
      {menuToggled && <Navbar mobile />}

      <Wrapper>{children}</Wrapper>
      <PrimaryFooter />
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  showHamburger: false,
};

export default Layout;
