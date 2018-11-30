import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import DotDotDot from 'react-dotdotdot';
import Image from 'react-image';
import styles from './Card.module.css';
import Card from '../../../hoc/Card';
import Link from '../../UI/Link/Link';
import { CARD_CONFIG } from '../../../constants/ui';
import { ARIA_LABEL_RESOURCE, ARIA_LABEL_REPO } from '../../../constants/ariaLabels';

const ComponentCard = ({ title, description, resourcePath, image, resourceType }) => (
  <Card resourceType={resourceType}>
    <h2 title={title}>
      <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE}>
        <DotDotDot clamp={CARD_CONFIG.maxTitleLines} tagName="span">
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} size="1x" />
          {title}
        </DotDotDot>
      </Link>
    </h2>
    <div className={styles.Body}>
      <DotDotDot clamp={CARD_CONFIG.maxDescriptionLines} className={styles.BodyDescription}>
        <p>{description}</p>
      </DotDotDot>
      <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE} className={styles.BodyImage}>
        <Image src={image} />
      </Link>
    </div>
  </Card>
);

ComponentCard.displayName = 'Component Card Component';

ComponentCard.propTypes = {
  sourcePath: PropTypes.string.isRequired,
  sourceName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
  resourceType: PropTypes.string.isRequired,
  image: PropTypes.string,
};

ComponentCard.defaultProps = {
  image: '',
};

export default ComponentCard;
