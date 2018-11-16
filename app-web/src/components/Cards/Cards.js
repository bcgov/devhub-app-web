import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import styles from './Cards.module.css';
import Card from './Card/Card';
import Link from '../Common/Link';
import Toggle from './Toggle';
import { ARIA_LABEL_REPO } from '../../constants/strings';
import { LARGE_SCREEN_LIMIT, SMALL_SCREEN_LIMIT } from '../../constants/ui';

const Cards = ({ topic, sourcePath, cards }) => {
  const cardComponents = cards.map(c => <Card {...c} key={shortid.generate()} />);
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
