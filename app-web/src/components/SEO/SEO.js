import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export const SEO = ({ title }) => <Helmet title={title}></Helmet>;

SEO.propTypes = {
  title: PropTypes.string,
};

export default SEO;
