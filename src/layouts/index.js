import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import { injectGlobal } from 'styled-components';
// import * as fonts from '../assets/fonts/fonts';
/* eslint-disable */
// font awesome loading
import '../utils/fontAwesomeLibrary';
import normalize from 'normalize.css';
import '../assets/styles/index.css';
import '../assets/styles/fonts.css';
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter';
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader';

// injectGlobal`
//   @font-face {
//     font-family: 'Roboto';
//     src: local('Roboto'), url('${fonts.RobotoBlack}') format('truetype');
//   }
// `

const Layout = ({ children, data }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <link
        href="https://portal.nrs.gov.bc.ca/nrs-portal-theme/images/favicon.ico"
        rel="icon"
        type="image/x-icon"
      />
    </Helmet>
    <PrimaryHeader />
    <div className="container">{children()}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func.isRequired,
};

export const LayoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Layout;
