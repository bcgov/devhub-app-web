import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import styles from './Cards.module.css';
import DefaultCard from './Card/DefaultCard';
import DocumentCard from './Card/DocumentCard';
import RepositoryCard from './Card/RepositoryCard';
import SelfServiceCard from './Card/SelfServiceCard';
import ComponentCard from './Card/ComponentCard';
import Toggle from './Toggle';
import { LARGE_SCREEN_LIMIT, SMALL_SCREEN_LIMIT, RESOURCE_TYPES } from '../../constants/ui';

const Cards = ({ topic, description, sourcePath, cards }) => {
  const cardComponents = cards.map(c => {
    switch (c.resource.type) {
      case RESOURCE_TYPES.RESPOSITORIES:
        return (
          <RepositoryCard
            repository={c.source.name}
            owner={c.owner}
            title={c.unfurl.title}
            description={c.unfurl.description}
            resourcePath={c.resource.path}
            image={c.unfurl.image}
            resourceType={c.resource.type}
            author={c.unfurl.author}
            key={shortid.generate()}
          />
        );
      case RESOURCE_TYPES.SELF_SERVICE_TOOLS:
        return (
          <SelfServiceCard
            title={c.unfurl.title}
            description={c.unfurl.description}
            resourcePath={c.resource.path}
            image={c.unfurl.image}
            resourceType={c.resource.type}
            author={c.unfurl.author}
            key={shortid.generate()}
          />
        );
      case RESOURCE_TYPES.COMPONENTS:
        return (
          <ComponentCard
            repository={c.source.name}
            owner={c.owner}
            title={c.unfurl.title}
            description={c.unfurl.description}
            resourcePath={c.resource.path}
            image={c.unfurl.image}
            resourceType={c.resource.type}
            author={c.unfurl.author}
            key={shortid.generate()}
          />
        );
      case RESOURCE_TYPES.DOCUMENTATION:
        return (
          <DocumentCard
            repository={c.source.name}
            owner={c.owner}
            title={c.unfurl.title}
            description={c.unfurl.description}
            resourcePath={c.resource.path}
            image={c.unfurl.image}
            resourceType={c.resource.type}
            author={c.unfurl.author}
            key={shortid.generate()}
          />
        );
      default:
        return (
          <DefaultCard
            title={c.unfurl.title}
            description={c.unfurl.description}
            resourcePath={c.resource.path}
            image={c.unfurl.image}
            resourceType={c.resource.type}
            author={c.unfurl.author}
            key={shortid.generate()}
          />
        );
    }
  });

  if (cardComponents.length > 0) {
    return (
      <section className={styles.CardsContainer}>
        <div className={styles.TopicContainer}>
          <h1>{topic}</h1>
          <p>{description}</p>
        </div>
        <div className={styles.LargeView}>
          <Toggle cardComponents={cardComponents} cardLimits={LARGE_SCREEN_LIMIT} />
        </div>
        <div className={styles.MobileView}>
          <Toggle cardComponents={cardComponents} cardLimits={SMALL_SCREEN_LIMIT} />
        </div>
      </section>
    );
  } else {
    return null;
  }
};

Cards.defaultProps = {
  sourcePath: '',
  description: '',
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  sourcePath: PropTypes.string,
  topic: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Cards;
