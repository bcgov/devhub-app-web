import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';

import { ThemeProvider } from 'emotion-theming';
import theme from '../theme'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);


addDecorator(storyFn => (
  <ThemeProvider theme={theme}>

      <div>
        {storyFn()}
      </div>

  </ThemeProvider>
));
  

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

