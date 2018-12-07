// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-browser.js
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './src/assets/styles/fontawesome.css';
import createStore from './src/store/createStore';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedFlagsProvider } from 'flag';
// this hack is to resolve issue https://stackoverflow.com/questions/49781726/react-font-awesome-renders-big-icon-until-scales-down
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export const wrapRootElement = ({ element }) => {
  const store = createStore();
  // eslint-disable-next-line
  const ConnectedRootElement = (
    <Provider store={store}>
      <ConnectedFlagsProvider>{element}</ConnectedFlagsProvider>
    </Provider>
  );

  return ConnectedRootElement;
};
