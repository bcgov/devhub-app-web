import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Card from './Card/Card';
import Toggle from './Toggle';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/ui';
import styles from './Cards.module.css';

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  max-width: 1100px;
  margin-bottom: 20px;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    margin-bottom: 15px;
  }
`;

const Col = styled.div`
  padding: 0 5px;
  flex: 0 0 33.333%;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    flex-basis: 33.333%;
  }
  @media (min-width: 1070px) {
    flex-basis: 25%;
  }
`;

const Cards = ({ topic, description, cards }) => {
  const cardComponents = cards.map(c => {
    return (
      <Col sm={6} md={4} lg={3}>
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
