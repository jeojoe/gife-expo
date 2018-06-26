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
  ChallengeReducers,
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

const yeOldeConsoleLog = console.log;
// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

const middlewares = [thunk, logger];
const reducers = combineReducers({
  ...BaseReducers,
  ...AuthReducers,
  ...UserReducers,
  ...ChallengeReducers,
});

export default (initialState) => {
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = Reactotron.createStore(reducers, initialState, enhancer);

  return store;
};
