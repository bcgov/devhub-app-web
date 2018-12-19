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
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth';
import featuresReducer from './reducers/features';
import siphonReducer from './reducers/siphon';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
  auth: authReducer,
  flags: featuresReducer,
  siphon: siphonReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel1,
  whitelist: ['ui'],
};

let composeEnhancers;
let middlewares;
// apply config to get redux dev tools working
if (typeof window !== 'undefined') {
  // eslint-disable-next-line
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middlewares = composeEnhancers();
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStoreFN = () => {
  const store = createStore(persistedReducer, middlewares);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default createStoreFN;
