import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cards.module.css';
import styled from '@emotion/styled';
import Card from './Card/Card';
import Toggle from './Toggle';
import { Container, Row, Col } from 'reactstrap';
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

const SpacedCol = styled(Col)`
  margin: 0px;
`;
const Cards = ({ topic, description, cards }) => {
  const cardComponents = cards.map(c => {
    return (
      <SpacedCol sm={6} md={4} lg={3}>
        <Card
          type={c.type}
          title={c.title}
          description={c.description}
          image={c.image}
          link={c.path}
        />
      </SpacedCol>
    );
  });

  return (
    cardComponents.length > 0 && (
      <Container fluid className={styles.CardsContainer}>
        <Row>
          <Col>
            <div className={styles.TopicContainer}>
              <h1>{topic}</h1>
              <p>{description}</p>
            </div>
          </Col>
        </Row>
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
