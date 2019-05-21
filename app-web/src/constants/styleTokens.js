export const STYLE_BASE = {
  fontSize: 16,
  spacing: 5,
  borderWidth: 1,
};

export const MAX_SPACE_UNIT_MULTIPLE = 20;

/**
 * returns an object of spacing units for things like padding/margin
 * @param {Number} maxSpacingMultiple the maximum multiple of the spacing factor
 * @param {Number} spacingFactor
 * @returns {Object} => {'1x': '8px', '2x': '16px'};
 */
const getSpacingUnits = (maxSpacingMultiple, spacingFactor) => {
  const spacingUnits = {};
  for (let i = 1; i <= maxSpacingMultiple; i++) {
    spacingUnits[`${i}x`] = `${i * spacingFactor}px`;
  }

  return spacingUnits;
};

export const SPACING = getSpacingUnits(MAX_SPACE_UNIT_MULTIPLE, STYLE_BASE.spacing);
