import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Cards.module.css';
import Button from '../UI/Button/Button';

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
        type="link"
        clicked={() => {
          this.toggledHandler(false);
        }}
      >
        Collapse
      </Button>
    ) : (
      <Button
        type="link"
        clicked={() => {
          this.toggledHandler(true);
        }}
      >
        Show All
      </Button>
    );
    const { cardComponents, cardLimits } = this.props;
    const cardShow = this.state.toggled ? cardComponents.length : cardLimits;
    const toggle =
      cardComponents.length > cardLimits ? (
        <div className={styles.ToggleButton}>{toggleIcon}</div>
      ) : null;

    return (
      <div>
        <div className={styles.Cards}>{cardComponents.slice(0, cardShow)}</div>
        {toggle}
      </div>
    );
  }
}

Toggle.propTypes = {
  cardComponents: PropTypes.array.isRequired,
  cardLimits: PropTypes.number.isRequired,
};

export default Toggle;
