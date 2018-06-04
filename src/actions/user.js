import { ActionTypes } from '../constants';

export function setAuthUser(authUser) {
  return {
    type: ActionTypes.SET_AUTH_USER,
    authUser,
  };
}
