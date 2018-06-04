import { ActionTypes } from '../constants';

export function setCurrentUser(currentUser) {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    currentUser,
  };
}
