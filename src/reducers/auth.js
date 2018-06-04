import { ActionTypes } from '../constants';

export const authUser = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_USER: {
      return action.authuser;
    }
    default: {
      return state;
    }
  }
};

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
