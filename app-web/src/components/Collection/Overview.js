import React from 'react';
import PropTypes from 'prop-types';

const Overview = ({ description, title }) => (
  <div>
    <h2>{title}</h2>
    <p>{description}</p>
    <hr />
  </div>
);

Overview.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Overview;
