import React from 'react';
import NavigationalItem from './NavigationalItem/NavigationalItem';
import classes from './NavigationalItems.module.css';

const NavigationalItems = props => {
  const navItems = props.navItems.map((item, ind) => {
    return (
      <NavigationalItem key={item + `_${ind}`}>
        <h1>{item}</h1>
      </NavigationalItem>
    );
  });

  return <ul className={classes.NavigationalItems}>{navItems}</ul>;
};

export default NavigationalItems;
