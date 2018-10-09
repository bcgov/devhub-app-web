import React from 'react';
import PropTypes from 'prop-types';
import styles from './Item.module.css';

const Item = ({ description, link }) => (
  <div className={styles.Item}>
    <h1>{description}</h1>
    <a href={link}>Learn more</a>
  </div>
);

Item.propTypes = {
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Item;
