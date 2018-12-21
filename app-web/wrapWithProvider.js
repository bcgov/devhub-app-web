/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedFlagsProvider } from 'flag';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './src/store/createStore';

const { store, persistor } = createStore();
export default ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedFlagsProvider>{element}</ConnectedFlagsProvider>
    </PersistGate>
  </Provider>
);
