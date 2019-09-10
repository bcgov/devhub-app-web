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
  brandImage:
    'https://u58tqm22fk-flywheel.netdna-ssl.com/wp-content/uploads/2016/06/BC-Gov-Logo-CMYK_pos.png',
});
