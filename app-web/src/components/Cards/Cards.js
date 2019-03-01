import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cards.module.css';

import Card from './Card/Card';
import Toggle from './Toggle';
import Col from './Column';
import Container from './Container';

const Cards = ({ topic, description, cards }) => {
  const cardComponents = cards.map(c => {
    return (
      <Col grid={4}>
        <Card
          type={c.type}
          title={c.title}
          description={c.description}
          image={c.image}
          link={c.path}
        />
      </Col>
    );
  });

  return (
    cardComponents.length > 0 && (
      <Container className={styles.CardsContainer}>
        <div className={styles.TopicContainer}>
          <h1>{topic}</h1>
          <p>{description}</p>
        </div>
        <Toggle cardComponents={cardComponents} cardLimits={4} />
      </Container>
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
