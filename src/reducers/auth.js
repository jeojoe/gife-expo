import { ActionTypes } from '../constants';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_LOGGEDIN: {
      return action.isLoggedIn;
    }
    default: {
      return state;
    }
  }
};

export const invitationCode = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SET_INVITATION_CODE: {
      return action.invitationCode;
    }
    default: {
      return state;
    }
  }
};
