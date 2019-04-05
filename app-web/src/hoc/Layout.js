import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Container } from 'reactstrap';
// layout local componenets
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import Navbar from '../components/Navbar/Navbar';

const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
`;

const Wrapper = styled.div`
  margin-top: 65px;
  flex-grow: 1;
  ${props => props.theme.breakpoints.main.desktop} {
    margin-top: 112px;
  }
`;

export const Layout = ({ children }) => {
  const [menuToggled, setMenuToggled] = useState(false);

  return (
    <StyledContainer fluid>
      <PrimaryHeader showHamburger hamburgerClicked={() => setMenuToggled(!menuToggled)} />

      <Navbar />
      {menuToggled && <Navbar mobile />}

      <Wrapper>{children}</Wrapper>
      <PrimaryFooter />
    </StyledContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
