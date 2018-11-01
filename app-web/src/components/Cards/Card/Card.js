import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './Card.module.css';
import Link from '../../Common/Link';
import { ARIA_LABEL_RESOURCE, ARIA_LABEL_REPO } from '../../../constants/strings';

const Card = ({ sourcePath, sourceName, title, description, resourcePath }) => (
  <article className={styles.Card}>
    <h2>
      <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE}>
        <FontAwesomeIcon icon={faExternalLinkSquareAlt} size="1x" />
        <span>{title}</span>
      </Link>
    </h2>
    <div className={styles.Body}>
      <p>{description}</p>
    </div>
    <div className={styles.Actions}>
      {/* <ul>
            </ul> */}
      <Link to={sourcePath} aria-label={ARIA_LABEL_REPO}>
        {sourceName}
      </Link>
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
