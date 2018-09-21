import React from 'react';
import PropTypes from 'prop-types';
import classes from './HexBlock.module.css';
import Link from '../../../Common/Link';

const HexBlock = ({ children, collapses, gridClassNumber, link, fontSize }) => {
  const classNames = [classes.HexBlock];
  console.log(gridClassNumber);
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

  return (
    <Link className={classNames.join(' ')} to={link} style={{ fontSize }}>
      {children}
    </Link>
  );
};

HexBlock.propTypes = {
  children: PropTypes.node,
  collapses: PropTypes.bool,
  clicked: PropTypes.func,
  gridClassNumber: PropTypes.number.isRequired,
  fontSize: PropTypes.string,
};

HexBlock.defaultProps = {
  children: '',
  collapses: false,
  clicked: () => undefined,
  fontSize: '16px',
};

export default HexBlock;
