import React from 'react';
import PropTypes from 'prop-types';
import NavigationalItem from './NavigationalItem/NavigationalItem';
import shortid from 'shortid';
import Hexgrid from '../../UI/Hexgrid/Hexgrid';
import classes from './NavigationalItems.module.css';

const NavigationalItems = props => {
  //get class name mappins so that the navigational item hexes display as a grid
  const navItems = props.navItems.map((item, ind) => (
    <NavigationalItem key={shortid.generate()} {...item} />
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
