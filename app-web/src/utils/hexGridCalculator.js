// maps over the amount of hexes meant for a grid and applies the appropriate class name to each hex
// eg if we have css set to style hex blocks in a 3 - 2 grid (see below)
//  () () ()
//    () ()
//  () () ()
// this function would return an array following that numbered pattern depending on the amount of
// hexblocks that exist in this grid
// eg hexGridCalculator(8, [3, 2]) => [3, 3, 3, 2, 2, 3, 3, 3]
// this return can be used to build tailored classNames for styling the hexes to conform to the desired
// grid. eg <HexBlock className="hex-3"/> <HexBlock className="hex-2"/>
/**
 * returns an array of ints that is meant to be used to map against an
 * array of HexBlocks to set a css className per hexblock based on the
 * declared pattern
 * @param {Integer} hexArrayLength 
 * @param {Array} pattern 
 */

const isPositiveIntegerOnly = int => {
  return int / 1 !== NaN && int > 0;
};

const hexGridCalculator = (hexArrayLength, pattern = [3, 2]) => {
  //is hexarray length a number?
  if (typeof hexArrayLength !== 'number' || hexArrayLength < 0) {
    throw new Error('Hex Array Length must be greater than 0!');
  }
  //is pattern an array of ints?
  if (pattern.constructor !== Array || !pattern.every(isPositiveIntegerOnly)) {
    throw new Error('pattern must be an array of postive ints');
  }
  let patternPosition = 0;
  let currentCountForPattern = 1;
  let patternNum = pattern[patternPosition];
  let hexGrid = [];
  for (let i = 0; i < hexArrayLength; i++) {
    hexGrid.push(patternNum);
    if (currentCountForPattern >= patternNum) {
      currentCountForPattern = 1;
      patternPosition =
        patternPosition + 1 > patternNum ? 0 : patternPosition + 1;
      patternNum = pattern[patternPosition];
    } else {
      currentCountForPattern++;
    }
  }
  return hexGrid;
};

export default hexGridCalculator;
