import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import storybookTheme from '../stories/theme';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);


addDecorator(storyFn => (
  <ThemeProvider theme={theme}>

      <div style={{fontFamily: 'sans-serif'}}>
        {/* STORY CODE START */}
        {storyFn()}
        {/* STORY CODE END */}
      </div>

  </ThemeProvider>
));
  

addDecorator(withInfo); 
addParameters({ options: { theme: storybookTheme } });

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

