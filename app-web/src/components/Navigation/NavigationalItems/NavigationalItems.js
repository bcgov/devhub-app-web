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

  return <nav className={classes.NavigationalItems}>{navItems}</nav>;
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
