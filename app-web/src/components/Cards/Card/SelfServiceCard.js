import React from 'react';
import PropTypes from 'prop-types';
import DotDotDot from 'react-dotdotdot';
import NameSpacedImg from '../../UI/NameSpacedImg/NameSpacedImg';
import styles from './Card.module.css';
import Card from '../../../hoc/Card';
import Link from '../../UI/Link/Link';
import { ARIA_LABEL_RESOURCE } from '../../../constants/ariaLabels';
import { CARD_CONFIG } from '../../../constants/ui';

const SelfServiceCard = ({ title, description, resourcePath, image, resourceType, author }) => (
  <Card resourceType={resourceType} title={title} author={author} resourcePath={resourcePath}>
    <div className={styles.Body}>
      <DotDotDot clamp={CARD_CONFIG.maxDescriptionLines} className={styles.BodyDescription}>
        <p>{description}</p>
      </DotDotDot>
      <div className={styles.BodyImage}>
        {image && image !== '' ? (
          <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE}>
            <NameSpacedImg src={image || ''} unstyled />
          </Link>
        ) : null}
      </div>
    </div>
  </Card>
);

SelfServiceCard.displayName = 'Self Service Card Component';

SelfServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
  resourceType: PropTypes.string.isRequired,
  image: PropTypes.string,
  author: PropTypes.string,
};

SelfServiceCard.defaultProps = {
  image: '',
  author: '',
};

export default SelfServiceCard;
