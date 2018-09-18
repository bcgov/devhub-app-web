import React from 'react';
import PropTypes from 'prop-types';
import classes from './HexBlock.module.css';
import Link from '../../Common/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HexBlock = ({ children, collapses, icon, gridClassNumber, link, fontSize}) => {
  const classNames = [classes.HexBlock];
  let iconWrapper = null;
  // apply a grid class style to allow hexes to stack on wrap
  switch (gridClassNumber) {
    case 2:
      classNames.push(classes.Row2);
      break;
    case 3:
      classNames.push(classes.Row3);
      break;
  }
  // apply a style to set the margin of the hex block
  // to allow for hexes to 'stack' the margin top that is set by default
  // must be removed
  if (collapses) {
    classNames.push(classes.Collapses);
  }
  //if theres an icon to pass in
  if (icon) {
    iconWrapper = (
      <span className={classes.Icon}>
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  }

  return (
    <Link className={classNames.join(' ')} to={link} style={{fontSize}}>
      {iconWrapper}
      {children}
    </Link>
  );
};

HexBlock.propTypes = {
  children: PropTypes.node,
  collapses: PropTypes.bool,
  clicked: PropTypes.func,
  icon: PropTypes.string,
  gridClassNumber: PropTypes.number.isRequired,
  fontSize: PropTypes.string
};

HexBlock.defaultProps = {
  children: '',
  collapses: false,
  clicked: () => undefined,
  icon: '',
  fontSize: '16px'
};

export default HexBlock;
