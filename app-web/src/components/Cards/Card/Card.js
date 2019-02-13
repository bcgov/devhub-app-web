import React from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import validURL from 'valid-url';
import DotDotDot from 'react-dotdotdot';

import { Link } from '../../UI/Link';
import { CARD_CONFIG } from '../../../constants/ui';
import { ARIA_LABEL_RESOURCE, ARIA_LABEL_RESOURCE_TYPE } from '../../../constants/ariaLabels';
import styles from './Card.module.css';

const Card = ({ title, description, resourceType, link }) => (
  <Link to={link} aria-label={ARIA_LABEL_RESOURCE} className={styles.Wrapper}>
    <article className={styles.Card}>
      {!!resourceType ? (
        <div className={styles.ResourceType} aria-label={ARIA_LABEL_RESOURCE_TYPE}>
          <h4>
            {resourceType}
            {validURL.isWebUri(link) ? (
              <small>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </small>
            ) : null}
          </h4>
        </div>
      ) : null}
      <header>
        <DotDotDot clamp={CARD_CONFIG.maxTitleLines}>
          <h2>{title}</h2>
        </DotDotDot>
      </header>
      <div className={styles.Body}>
        <DotDotDot clamp={CARD_CONFIG.maxDescriptionLines}>
          <p>{description}</p>
        </DotDotDot>
      </div>
      <div className={styles.Metadata}>{/* metadata will go here */}</div>
    </article>
  </Link>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourceType: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default Card;
