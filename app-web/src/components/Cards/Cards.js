import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cards.module.css';
import Card from './Card/Card';

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

const Cards = ({ topic, description, cards }) => {
  const cardComponents = cards.map(c => {
    return (
      <Card
        key={c.path}
        type={c.type}
        title={c.title}
        description={c.description}
        image={c.image}
        link={c.path}
      />
    );
  });

  return (
    cardComponents.length > 0 && (
      <section className={styles.CardsContainer}>
        <div className={styles.TopicContainer}>
          <h1>{topic}</h1>
          <p>{description}</p>
        </div>
        {cardComponents}
      </section>
    )
  );
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
