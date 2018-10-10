import React from 'react';
import PropTypes from 'prop-types';
import styles from './Item.module.css';

const Item = ({ description, link, children }) => (
  <div className={styles.Item}>
    <h1>{description}</h1>
    <div className={styles.Body}>
      {children}
    </div>
    <div className={styles.Bottom}>
      <a href={link} className={styles.Action}>Learn more</a>
    </div>
  </div>
);

Item.propTypes = {
  children: PropTypes.string,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

Item.defaultProps = {
  children: '',
};

export default Item;
