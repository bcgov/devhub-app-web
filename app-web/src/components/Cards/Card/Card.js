import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import Link from '../../Common/Link';

const Card = ({ sourceURL, sourceName, title, description, resourcePath }) => (
  <article className={styles.Card}>
    <h2>{title}</h2>
    <div className={styles.Body}>
      <p>{description}</p>
    </div>
    <div className={styles.Actions}>
      {/* <ul>
            </ul> */}
      <Link to={sourceURL}>{sourceName}</Link>
    </div>
  </article>
);

Card.displayName = 'Github Card Component';

Card.propTypes = {
  sourceURL: PropTypes.string.isRequired,
  sourceName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
};

export default Card;
