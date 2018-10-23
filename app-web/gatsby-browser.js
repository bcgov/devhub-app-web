// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-browser.js
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedFlagsProvider } from 'flag';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import createStore from './src/store/createStore';

exports.replaceRouterComponent = ({ history }) => {
  const store = createStore();
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <ConnectedFlagsProvider>
        <Router history={history}>{children}</Router>
      </ConnectedFlagsProvider>
    </Provider>
  );

  return ConnectedRouterWrapper;
};
