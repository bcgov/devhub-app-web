import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../UI/Banner/Banner';
import Hamburger from '../UI/Hamburger/Hamburger';
// login not being implemented at this time
import Login from '../Auth/Login';

import styled from '@emotion/styled';

const BP = '932px';

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.blue};
  border-bottom: 2px solid ${({ theme }) => theme.colors.yellow};
  padding: 0 12px 0 25px;
  color: #fff;
  display: flex;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 65px;
  @media screen and (min-width: 600px) {
    padding: 0 65px 0 65px;
  }
`;

const StyledHamburger = styled(Hamburger)`
  @media screen and (min-width: ${BP}) {
    display: none;
  }
`;

const LoginWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${BP}) {
    display: inline-block;
  }
`;

const Panel = styled.div`
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  display: flex;
`;

export const PrimaryHeader = ({ showHamburger, hamburgerClicked, authenticated }) => (
  <Header>
    <Banner />
    <Panel>
      <LoginWrapper>
        <Login authenticated={authenticated} />
      </LoginWrapper>
      {showHamburger ? <StyledHamburger clicked={hamburgerClicked} /> : null}
    </Panel>
  </Header>
);

PrimaryHeader.propTypes = {
  showHamburger: PropTypes.bool,
  hamburgerClicked: PropTypes.func,
  authenticated: PropTypes.bool,
};

PrimaryHeader.defaultProps = {
  showHamburger: false,
  authenticated: false,
  hamburgerClicked: () => undefined,
};

export default PrimaryHeader;
