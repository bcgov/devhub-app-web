import React from 'react';
import PropTypes from 'prop-types';
import DotDotDot from 'react-dotdotdot';
import Image from 'react-image';
import styles from './Card.module.css';
import Card from '../../../hoc/Card';
import Link from '../../UI/Link/Link';
import ActionsRibbon from './ActionsRibbon';
import { ARIA_LABEL_RESOURCE } from '../../../constants/ariaLabels';
import { CARD_CONFIG } from '../../../constants/ui';

const DocumentCard = ({
  title,
  description,
  resourcePath,
  image,
  resourceType,
  author,
  repository,
  owner,
}) => (
  <Card resourceType={resourceType} title={title} resourcePath={resourcePath} author={author}>
    <div className={styles.Body}>
      <DotDotDot clamp={CARD_CONFIG.maxDescriptionLines} className={styles.BodyDescription}>
        <p>{description}</p>
      </DotDotDot>
      <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE} className={styles.BodyImage}>
        <Image src={image} />
      </Link>
    </div>
    <ActionsRibbon
      actions={CARD_CONFIG.actionsRibbon[resourceType]}
      repository={repository}
      owner={owner}
    />
  </Card>
);

DocumentCard.displayName = 'Document Card Component';

DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
  resourceType: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  image: PropTypes.string,
  author: PropTypes.string,
};

DocumentCard.defaultProps = {
  image: '',
  author: '',
};

export default DocumentCard;
