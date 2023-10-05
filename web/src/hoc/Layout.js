import React, { useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Alert, Container } from 'reactstrap';
import Helmet from 'react-helmet';

// layout local components
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import { Navbar } from '../components/Navbar/Navbar';

import { MAIN_NAV_ROUTE_LIST } from '../constants/routes';
import { ButtonLink } from '../components/UI/Link';

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

const RetirementNotice = styled(Alert)`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  margin-bottom: 15px;
  padding: 20px;
`;

const utmLink =
  'https://mvp.developer.gov.bc.ca/?utm_source=devhub-classic&utm_medium=web&utm_campaign=retirement-notice-oct-2023';
export const Layout = ({ children }) => {
  const [menuToggled, setMenuToggled] = useState(false);
  return (
    <StyledContainer fluid>
      {/* This is to fix the some of the issues occuring on IE 11, specifically the nav issues*/}
      <Helmet>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
      </Helmet>
      <PrimaryHeader showHamburger hamburgerClicked={() => setMenuToggled(!menuToggled)} />

      <Navbar links={MAIN_NAV_ROUTE_LIST} toggled={menuToggled} />

      <Wrapper>
        <RetirementNotice color="primary">
          <h4 className="alert-heading">We're working on a new and improved DevHub!</h4>
          <p>
            Please try our MVP at{' '}
            <a href={utmLink} className="alert-link">
              https://mvp.developer.gov.bc.ca
            </a>
            , and{' '}
            <a href="mailto:developer.experience@gov.bc.ca" className="alert-link">
              let us know
            </a>{' '}
            what's missing to make it useful for you.
          </p>
          <div>
            <ButtonLink to={utmLink}>Test it out!</ButtonLink>
          </div>
        </RetirementNotice>
        {children}
      </Wrapper>
      <PrimaryFooter />
    </StyledContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export const query = graphql`
  fragment DevhubNodeConnection on ConnectedNode {
    path
    fields {
      position
      resourceType
      title
      description
      standAlonePath
      path
    }
    id
  }
  fragment JourneyNodeConnection on ConnectedStopNode {
    path
    fields {
      resourceType
      title
      description
    }
  }
`;
export default Layout;
