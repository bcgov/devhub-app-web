import React from 'react';
import PropTypes from 'prop-types';
import NavigationalItem from './NavigationalItem/NavigationalItem';
import classes from './NavigationalItems.module.css';
import hexGridCalculator from '../../../utils/hexGridCalculator';

const NavigationalItems = props => {
  //get class name mappins so that the navigational item hexes display as a grid
  const hexClassNameMappings = hexGridCalculator(props.navItems.length, [3, 2]);
  const navItems = props.navItems.map((item, ind) => (
    <NavigationalItem
      key={`${item.title}_${ind}`}
      {...item}
      hexGridClassNumber={hexClassNameMappings[ind]}
    />
  ));

  return <div className={classes.NavigationalItems}>{navItems}</div>;
};

NavigationalItems.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.node).isRequired
}

export default NavigationalItems;
