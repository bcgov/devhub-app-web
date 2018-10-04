import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from './Resource.module.css';
import Item from './Item/Item';

const Resource = ({ category, resources }) => {
  const items = resources.map(i => <Item key={shortid.generate()} {...i} />);
  return (
    <div className={styles.Resource}>
      <h1 className={styles.Title}>{category}</h1>
      <div className={styles.Items}>{items}</div>
    </div>
  );
};

Resource.propTypes = {
  category: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Resource;
