import React from 'react';
import NavigationalItem from './NavigationalItem/NavigationalItem';
import classes from './NavigationalItems.module.css';

const NavigationalItems = props => {
  const navItems = props.navItems.map((item, ind) => (
    <NavigationalItem
      key={`${item.text}_${ind}`}
      icon={item.icon}
      title={item.text}
      link={item.link}
    />
  ));

  return <div className={classes.NavigationalItems}>{navItems}</div>;
};

export default NavigationalItems;
