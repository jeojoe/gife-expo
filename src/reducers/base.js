import { ActionTypes } from '../constants';

export const isLoading = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_LOADING: {
      return action.isLoading;
    }
    default: {
      return state;
    }
  }
};

export const isAppReady = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SET_APP_READY: {
      return action.isAppReady;
    }
    default: {
      return state;
    }
  }
};
