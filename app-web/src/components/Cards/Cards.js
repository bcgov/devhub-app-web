import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import styles from './Cards.module.css';
import Card from './Card/Card';
import Link from '../Common/Link';

const Cards = ({ topic, sourcePath, cards }) => {
  const cardComponents = cards.map(c => <Card {...c} key={shortid.generate()} />);
  const octoKat =
    sourcePath === '' ? null : (
      <Link to={sourcePath}>
        <FontAwesomeIcon icon={faGithub} />
      </Link>
    );
  return (
    <section className={styles.CardsContainer}>
      <div className={styles.TopicContainer}>
        <h1>{topic}</h1>
        {octoKat}
      </div>
      <div className={styles.Cards}>{cardComponents}</div>
    </section>
  );
};

Cards.displayName = 'Github Cards Component';

Cards.defaultProps = {
  sourcePath: '',
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  sourcePath: PropTypes.string,
  topic: PropTypes.string.isRequired,
};

export default Cards;
