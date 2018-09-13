import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
import normalize from 'normalize.css';

const Layout = ({ children }) => (
  <div>
    this is the layout
    {children()}
  </div>
);

Layout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Layout;
