import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/auxillary';
import styles from './Cards.module.css';
import Button from '../UI/Button/Button';
import Row from './Row';

export const TEST_IDS = {
  toggleOn: 'toggle.btn.on',
  toggleOff: 'toggle.btn.off',
}
/**
 * Toggle component
 * This component has an arrow button to toggle the Cards to show all or collapse
 * @prop cardComponents containing each card
 * @prop cardLimits specify how many cards to shows as inital view
 */
class Toggle extends Component {
  state = {
    toggled: false,
  };

  toggledHandler = toggled => this.setState({ toggled });

  render() {
    const toggleIcon = this.state.toggled ? (
      <Button
        variant="link"
        data-testid={TEST_IDS.toggleOff}
        clicked={() => {
          this.toggledHandler(false);
        }}
      >
        Collapse
      </Button>
    ) : (
      <Button
        variant="link"
        data-testid={TEST_IDS.toggleOn}
        clicked={() => {
          this.toggledHandler(true);
        }}
      >
        Show All
      </Button>
    );
    const { cardComponents, cardLimits } = this.props;
    let maxRows = Math.ceil(cardComponents.length / cardLimits);

    let rows = [];
    for (let i = 0; i < maxRows; i++) {
      const start = i * cardLimits;
      const end = start + cardLimits;
      rows.push(
        <Row grid={4} key={`${i}-${start}-${end}`}>
          {cardComponents.slice(start, end)}
        </Row>,
      );
    }

    const cardShow = this.state.toggled ? rows : rows[0];
    // show a toggle button ?
    const toggle =
      cardComponents.length > cardLimits ? (
        <div className={styles.ToggleButton}>{toggleIcon}</div>
      ) : null;

    return (
      <Aux>
        {cardShow}
        {toggle}
      </Aux>
    );
  }
}

Toggle.propTypes = {
  cardComponents: PropTypes.array.isRequired,
  cardLimits: PropTypes.number.isRequired,
};

export default Toggle;
