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
import { CARD_TOGGLE_LIMIT, RESOURCE_TYPES } from '../../constants/ui';

/**
 * @param {Number} limit the maximum limit of cards to show in toggle component
 * @param {Number} numCards the number of cards to render
 * @param {Number} cardsPerRow
 * @returns {Number} the idea limit
 */
export const getIdealCardsLargeLimit = (limit, numCards, cardsPerRow) => {
  let newLimit = limit;
  while (numCards < newLimit && newLimit - cardsPerRow > 0) {
    newLimit -= cardsPerRow;
  }
  return newLimit;
};

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
    // find the ideal large screen limit based on number of cards, and cards rendering per row
    const CARDS_PER_ROW = 3; // ideally in a true grid system we would have a more concrete styling
    // to ensure cards are 3 per row. When this container is transferred to bootsraps grid system, this
    // will be so.
    const idealLimit = getIdealCardsLargeLimit(
      CARD_TOGGLE_LIMIT.LARGE,
      cardComponents.length,
      CARDS_PER_ROW,
    );

    return (
      <section className={styles.CardsContainer}>
        <div className={styles.TopicContainer}>
          <h1>{topic}</h1>
          <p>{description}</p>
        </div>
        <div className={styles.LargeView}>
          <Toggle cardComponents={cardComponents} cardLimits={idealLimit} />
        </div>
        <div className={styles.MobileView}>
          <Toggle cardComponents={cardComponents} cardLimits={CARD_TOGGLE_LIMIT.SMALL} />
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
