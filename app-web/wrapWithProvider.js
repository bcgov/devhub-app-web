// taken from https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/wrap-with-provider.js
import React from 'react';
import { Provider } from 'react-redux';

import createStore from './src/store/createStore';

const store = createStore();
// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  console.log(arguments);
  return <Provider store={store}>{element}</Provider>;
};
