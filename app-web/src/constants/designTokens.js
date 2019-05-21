export const STYLE_BASE = {
  fontSize: 16,
  spacing: 5,
  borderWidth: 1,
};

// custom font size typing
// CUSTOM_TYPE.sm => 16px;
export const CUSTOM_TYPE = {
  sm: `${STYLE_BASE}px`,
  md: `${STYLE_BASE * 1.5}px`,
  lg: `${STYLE_BASE * 2}px`,
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

// creates a object that has multiples of spacing units in pixels
// SPACING['1x'] => '5px'
export const SPACING = getSpacingUnits(MAX_SPACE_UNIT_MULTIPLE, STYLE_BASE.spacing);

// bootstrap breakpoints used for emotion custom styled components
export const BOOTSTRAP_BREAKPOINTS = [
  { alias: 'sm', width: 576 },
  { alias: 'md', width: 768 },
  { alias: 'lg', width: 992 },
  { alias: 'xl', width: 1200 },
];

/**
 * returns an object aliased by bootstrap breakpoint values
 * {
 *   sm: @media (min-width: ...)
 *   md: ...
 * }
 * Usage:
 * https://emotion.sh/docs/media-queries#reusable-media-queries
 */
export const EMOTION_BOOTSTRAP_BREAKPOINTS = BOOTSTRAP_BREAKPOINTS.reduce(
  (breakpoints, currentBp) => {
    breakpoints[currentBp.alias] = `@media (min-width: ${currentBp.width}px)`;
    return breakpoints;
  },
  {},
);
