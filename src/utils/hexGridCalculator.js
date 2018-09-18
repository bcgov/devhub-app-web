// maps over the amount of hexes meant for a grid and applies the appropriate class name to each hex

const hexGridCalculator = (hexArrayLength, pattern = [3, 2]) => {
  //is hexarray length a number?
  if (typeof hexArrayLength !== 'number' || hexArrayLength < 0)
    throw new Error('Hex Array Length must be greater than 0!');
  //is pattern an array of ints?
  if (pattern.constructor !== Array || pattern.some(isNaN))
    throw new Error('pattern must be an array of ints');
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
