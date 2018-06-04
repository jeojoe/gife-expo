import { ActionTypes } from '../constants';

export const currentUser = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER: {
      return action.currentUser;
    }
    default: {
      return state;
    }
  }
};
