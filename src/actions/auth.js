import { ActionTypes } from '../constants';
import { Auth } from '../services';

export function setIsLoggedIn(isLoggedIn) {
  return {
    type: ActionTypes.SET_IS_LOGGEDIN,
    isLoggedIn,
  };
}

export function setInvitationCode(invitationCode) {
  return async (dispatch) => {
    try {
      await Auth.setInvitationCode(invitationCode);
      dispatch({
        type: ActionTypes.SET_INVITATION_CODE,
        invitationCode,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
