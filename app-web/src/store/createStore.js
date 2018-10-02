import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';

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
  auth: reducer,
});
//redux debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//creates store with combined reducer and applys redux debugger helper
//and thunk async action creator middleware
const createStoreFN = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default createStoreFN;
