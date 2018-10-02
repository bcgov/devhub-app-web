// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-browser.js
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './src/store/createStore';

const store = createStore();
export const replaceRouterComponent = ({ history }) => {
  console.log(history, 'history');
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
};
