import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import classes from './Hexgrid.module.css';
import HexBlock from './HexBlock/HexBlock';
import hexGridCalculator from '../../../utils/hexGridCalculator';
// hex grid is a hoc that expects an array of React Components as 'items'
// it independantly wraps
// each 'item' component inside of a HexBlock Component.
// The HexBlock controls presentation by rendering each component
// inside of a hexagon shaped anchor tag
const Hexgrid = ({ items, gridPattern, hexConfig }) => {
  //loop over children and wrap them in a hex block
  const hexgridClassMappings = hexGridCalculator(items.length, gridPattern);
  const hexblocks = items.map((item, index) => {
    if (item.props.link) {
      //binds a link prop to the hex block if exists so that hex block is clickable
      hexConfig.link = item.props.link;
    }
    if (item.props.id) {
      //binds the id property to hex block
      hexConfig.id = item.props.id;
    }
    return (
      <HexBlock
        {...hexConfig}
        gridClassNumber={hexgridClassMappings[index]}
        key={shortid.generate()}
      >
        {item}
      </HexBlock>
    );
  });
  return <div className={classes.Hexgrid}>{hexblocks}</div>;
};

Hexgrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  gridPattern: PropTypes.arrayOf(PropTypes.number),
};

Hexgrid.defaultProps = {
  gridPattern: [3, 2],
};

export default Hexgrid;
