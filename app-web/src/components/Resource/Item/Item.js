import React from 'react';
import PropTypes from 'prop-types';
import styles from './Item.module.css';

const Item = ({ title, abstract, link }) => {
  const abstractPara = abstract ? <p>{abstract}</p> : <p>Click below for more details.</p>;
  return (
    <div className={styles.Item}>
      <h1>{title}</h1>
      <div className={styles.Body}>{abstractPara}</div>
      <div className={styles.Bottom}>
        <a href={link} className={styles.Action}>
          Learn more
        </a>
      </div>
    </div>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Item;
