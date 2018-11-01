// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-browser.js
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './src/assets/styles/fontawesome.css';
import createStore from './src/store/createStore';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedFlagsProvider } from 'flag';
// this hack is to resolve issue https://stackoverflow.com/questions/49781726/react-font-awesome-renders-big-icon-until-scales-down
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

exports.replaceRouterComponent = ({ history }) => {
  const store = createStore();
  // eslint-disable-next-line
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <ConnectedFlagsProvider>
        <Router history={history}>{children}</Router>
      </ConnectedFlagsProvider>
    </Provider>
  );

  return ConnectedRouterWrapper;
};
