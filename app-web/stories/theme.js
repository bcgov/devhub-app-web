import { create } from '@storybook/theming';
import { DEVHUB_PALETTE } from '../theme';

export default create({
  base: 'light',

  colorPrimary: 'hotpink',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: 'sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: DEVHUB_PALETTE.darkgrey,
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: DEVHUB_PALETTE.white,
  barSelectedColor: 'black',
  barBg: DEVHUB_PALETTE.blue,

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'My custom storybook',
  brandUrl: 'https://example.com',
  brandImage: 'https://placehold.it/350x150',
});
