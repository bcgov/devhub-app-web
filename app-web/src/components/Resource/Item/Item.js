import React from 'react';
import PropTypes from 'prop-types';
import styles from './Item.module.css';

const Item = ({ title, abstract, link, sourceName }) => {
  const abstractPara = abstract ? <p>{abstract}</p> : <p>Click below for more details.</p>;
  return (
    <article className={styles.Item} data-sourceName={sourceName}>
      <header>
        <h1>{title}</h1>
      </header>
      <div className={styles.Body}>{abstractPara}</div>
      <div className={styles.Bottom}>
        <a href={link} className={styles.Action}>
          Learn more
        </a>
      </div>
      <div class={styles.SourceLabel} title={styles.SourceLabel}>
        {sourceName}
      </div>
    </article>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Item;
