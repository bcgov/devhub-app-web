import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { MAIN_NAVIGATION_BTN } from '../../../constants/ui';
import NavigationalItem from './NavigationalItem/NavigationalItem';
import Hexgrid from '../../UI/Hexgrid/Hexgrid';
import classes from './NavigationalItems.module.css';

const NavigationalItems = props => {
  //get class name mappins so that the navigational item hexes display as a grid
  const navItems = props.navItems.map((item, ind) => (
    <NavigationalItem
      key={shortid.generate()}
      {...item}
      id={`${MAIN_NAVIGATION_BTN}-${ind}`}
    />
  ));

  return (
    <nav className={classes.NavigationalItems}>
      <Hexgrid hexConfig={{ collapses: true }} items={navItems} />
    </nav>
  );
};

NavigationalItems.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default NavigationalItems;
