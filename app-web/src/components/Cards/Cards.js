import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import styles from './Cards.module.css';
import DefaultCard from './Card/DefaultCard';
import DocumentCard from './Card/DocumentCard';
import RepositoryCard from './Card/RepositoryCard';
import SelfServiceCard from './Card/SelfServiceCard';
import ComponentCard from './Card/ComponentCard';
import Link from '../UI/Link/Link';
import Toggle from './Toggle';
import { ARIA_LABEL_REPO } from '../../constants/ariaLabels';
import { LARGE_SCREEN_LIMIT, SMALL_SCREEN_LIMIT, RESOURCE_TYPES } from '../../constants/ui';

const Cards = ({ topic, sourcePath, cards }) => {
  const cardComponents = cards.map(c => {
    switch (c.resourceType) {
      case RESOURCE_TYPES.RESPOSITORIES:
        return <RepositoryCard {...c} key={shortid.generate()} />;
      case RESOURCE_TYPES.SELF_SERVICE_TOOLS:
        return <SelfServiceCard {...c} key={shortid.generate()} />;
      case RESOURCE_TYPES.COMPONENTS:
        return <ComponentCard {...c} key={shortid.generate()} />;
      case RESOURCE_TYPES.DOCUMENTATION:
        return <DocumentCard {...c} key={shortid.generate()} />;
      default:
        return <DefaultCard {...c} key={shortid.generate()} />;
    }
  });
  const octoKat =
    sourcePath === '' ? null : (
      <Link to={sourcePath} aria-label={ARIA_LABEL_REPO}>
        <FontAwesomeIcon icon={faGithub} color="#242424" size="1x" />
      </Link>
    );
  return (
    <section className={styles.CardsContainer}>
      <div className={styles.TopicContainer}>
        <h1>{topic}</h1>
        {octoKat}
      </div>
      <div className={styles.LargeView}>
        <Toggle cardComponents={cardComponents} cardLimits={LARGE_SCREEN_LIMIT} />
      </div>
      <div className={styles.MobileView}>
        <Toggle cardComponents={cardComponents} cardLimits={SMALL_SCREEN_LIMIT} />
      </div>
    </section>
  );
};

Cards.defaultProps = {
  sourcePath: '',
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  sourcePath: PropTypes.string,
  topic: PropTypes.string.isRequired,
};

export default Cards;
