import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Card.module.css';
import Link from '../../Common/Link';

const Card = ({ sourcePath, sourceName, title, description, resourcePath }) => (
  <article className={styles.Card}>
    <h2>
      <Link to={resourcePath}>
        <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
        <span>{title}</span>
      </Link>
    </h2>
    <div className={styles.Body}>
      <p>{description}</p>
    </div>
    <div className={styles.Actions}>
      {/* <ul>
            </ul> */}
      <Link to={sourcePath}>{sourceName}</Link>
    </div>
  </article>
);

Card.displayName = 'Github Card Component';

Card.propTypes = {
  sourcePath: PropTypes.string,
  sourceName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
};

export default Card;
