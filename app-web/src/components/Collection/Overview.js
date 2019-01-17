import React from 'react';
import PropTypes from 'prop-types';
import styles from './Overview.module.css';

const Overview = ({ description, title }) => (
  <div className={styles.Overview}>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

Overview.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Overview;
