import React from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import validURL from 'valid-url';
import { Link } from '../../UI/Link';
import styles from './Card.module.css';
import { CARD_CONFIG } from '../../../constants/ui';
import DotDotDot from 'react-dotdotdot';

const Card = ({ title, description, resourceType, link }) => (
  <Link to={link} aria-label="" className={styles.Wrapper}>
    <article className={styles.Card}>
      {!!resourceType ? (
        <div className={styles.ResourceType}>
          <h4>
            {resourceType}
            {validURL.isWebUri(link) ? (
              <small>
                <FontAwesomeIcon icon={faExternalLinkAlt} aria-label="" />
              </small>
            ) : null}
          </h4>
        </div>
      ) : null}
      <header>
        <h2>{title}</h2>
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
