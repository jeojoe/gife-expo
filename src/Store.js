import {
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
// Impore reducers
import {
  BaseReducers,
  AuthReducers,
  UserReducers,
} from './reducers';

// Setup Reactotron (must exec before createStore)
Reactotron
  .configure({
    name: 'GIFE Expo',
  })
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .connect();


const middlewares = [thunk, logger];
const reducers = combineReducers({
  ...BaseReducers,
  ...AuthReducers,
  ...UserReducers,
});

export default (initialState) => {
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = Reactotron.createStore(reducers, initialState, enhancer);

  return store;
};
