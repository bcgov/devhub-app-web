import { RESOURCE_TYPES, TOPICS, SEARCH_RESOURCE_TYPES } from './ui';

export const STYLE_BASE = {
  fontSize: 14,
  spacing: 5,
  borderWidth: 1,
};

// custom font size typing
// CUSTOM_TYPE.sm => 16px;
export const CUSTOM_TYPE = {
  sm: `${STYLE_BASE.fontSize}px`,
  md: `${STYLE_BASE.fontSize * 1.5}px`,
  lg: `${STYLE_BASE.fontSize * 2}px`,
  xl: `${STYLE_BASE.fontSize * 3}px`,
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

const breakpoint = (amount, unit = 'px') => `@media (min-width: ${amount}${unit})`;
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
    breakpoints[currentBp.alias] = breakpoint(currentBp.width);
    return breakpoints;
  },
  {},
);

export const CUSTOM_BREAKPOINTS = {
  navbar: breakpoint(932),
};

// COLOR PALETTE TOKENS
// We have two palettes that are in use
// the design-system palette https://developer.gov.bc.ca/Design-System/Colour-Palette
// and our custom devhub palette for further customization

// sample usage would be  (using emotion css)
// import { DS_PALETTE } from '...'
// css` border-color: ${DS_PALETTE.brand.yellow}`;
// bc design-system palette
export const DS_PALETTE = {
  brand: {
    yellow: '#FCBA19',
    blue: '#003366',
  },
  text: {
    darkgrey: '#494949',
  },
  links: {
    blue: '#1A5A96',
  },
  backgrounds: {
    blue: '#38598A',
    lightgrey: '#F2F2F2',
  },
  red: '#D8292F',
  green: '#2E8540',
};

// devhub specific palette
export const DEVHUB_PALETTE = {
  primary: DS_PALETTE.brand.blue,
  secondary: DS_PALETTE.brand.yellow,
  [RESOURCE_TYPES.COMPONENTS]: '#4299D2',
  [RESOURCE_TYPES.DOCUMENTATION]: '#246BD1',
  [RESOURCE_TYPES.PEOPLE]: '#E17039',
  [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: '#F3BA45',
  [TOPICS]: '#444',
  [RESOURCE_TYPES.REPOSITORIES]: '#6e5494',
  [SEARCH_RESOURCE_TYPES.GITHUB_ISSUE]: '#6e5494',
  [RESOURCE_TYPES.EVENTS]: '#f44b42',
  link: DS_PALETTE.links.blue,
};
