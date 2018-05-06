import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Impore reducers
import * as BaseReducers from './reducers/base';

const middlewares = [thunk, logger];
const reducers = combineReducers({
  ...BaseReducers,
});

export default (initialState) => {
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(reducers, initialState, enhancer);

  return store;
};
