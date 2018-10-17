// taken from https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux
// in prep for porting over to gatsby v2 (this file will be used at that point)
// import wrapWithProvider from './wrapWithProvider';
// export const wrapRootElement = wrapWithProvider;

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ConnectedFlagsProvider } from 'flag';
import createStore from './src/store/createStore';

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const store = createStore();

  const ConnectedBody = () => (
    <Provider store={store}>
      <ConnectedFlagsProvider>{bodyComponent}</ConnectedFlagsProvider>
    </Provider>
  );
  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
