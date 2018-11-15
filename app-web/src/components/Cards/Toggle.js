import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Cards.module.css';
import { LARGE_SCREEN_LIMIT, SMALL_SCREEN_LIMIT } from '../../constants/ui';

/**
 * Toggle component
 * This component has an arrow button to toggle the Cards to show all or collapse
 * @prop cardComponents containing each card
 */
class Toggle extends Component {
  state = {
    toggled: false,
  };

  toggledHandler = toggled => this.setState({ toggled });

  render() {
    const cardLimit = this.state.toggled ? 100 : LARGE_SCREEN_LIMIT;
    const toggleIcon = this.state.toggled ? (
      <button
        onClick={() => {
          this.toggledHandler(false);
        }}>Collapse</button>
    ) : (
      <button
        onClick={() => {
          this.toggledHandler(true);
        }}>Show All</button>
    );
    const { cardComponents } = this.props;
    const hideToggleButton =
      cardComponents.length > LARGE_SCREEN_LIMIT ? styles.ToggleButton : styles.HideToggleButton;

    return (
      <div>
        <div className={styles.Cards}>{cardComponents.slice(0, cardLimit)}</div>
        <div className={hideToggleButton}>{toggleIcon}</div>
      </div>
    );
  }
}

Toggle.propTypes = {
  cardComponents: PropTypes.array.isRequired,
};

export default Toggle;
