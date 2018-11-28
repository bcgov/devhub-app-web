import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import DotDotDot from 'react-dotdotdot';
import Image from 'react-image';
import styles from './Card.module.css';
import Card from '../../../hoc/Card';
import Link from '../../UI/Link/Link';
import { ARIA_LABEL_RESOURCE, ARIA_LABEL_REPO } from '../../../constants/ariaLabels';

const RepositoryCard = ({ sourcePath, sourceName, title, description, resourcePath, image }) => (
  <Card>
    <h2 title={title}>
      <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE}>
        <DotDotDot clamp={2} tagName="span">
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} size="1x" />
          {title}
        </DotDotDot>
      </Link>
    </h2>
    <div className={styles.Body}>
      <DotDotDot clamp={4} className={styles.BodyDescription}>
        <p>{description}</p>
      </DotDotDot>
      <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE} className={styles.BodyImage}>
        <Image src={image} />
      </Link>
    </div>
    <div className={styles.Actions}>
      {/* <ul>
            </ul> */}
      <Link to={sourcePath} aria-label={ARIA_LABEL_REPO}>
        {sourceName}
      </Link>
    </div>
  </Card>
);

RepositoryCard.displayName = 'Repository Card Component';

RepositoryCard.propTypes = {
  sourcePath: PropTypes.string,
  sourceName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
  image: PropTypes.string,
};

RepositoryCard.defaultProps = {
  image: '',
};

export default RepositoryCard;
