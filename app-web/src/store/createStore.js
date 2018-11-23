import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import featuresReducer from './reducers/features';
import siphonReducer from './reducers/siphon';
import uiReducer from './reducers/ui';
// const logger = store => {
//   return next => {
//     return action => {
//       console.log('MiddleWare: Dispatching', action);
//       const result = next(action);
//       // console.log('MiddleWare: next state', store.getState());
//       console.log(next);
//       return result;
//     };
//   };
// };

const rootReducer = combineReducers({
  auth: authReducer,
  flags: featuresReducer,
  siphon: siphonReducer,
  ui: uiReducer,
});

let composeEnhancers;
let middlewares;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middlewares = composeEnhancers(applyMiddleware(thunk));
}
// edux debugging
// creates store with combined reducer and applys redux debugger helper
// and thunk async action creator middleware
const createStoreFN = () => {
  return createStore(rootReducer, middlewares);
};

export default createStoreFN;
