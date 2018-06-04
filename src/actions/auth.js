import { ActionTypes } from '../constants';
import { AuthServices, Firebase } from '../services';

export function loginFacebook(accessToken) {
  return async (dispatch) => {
    const credential = Firebase.auth.FacebookAuthProvider.credential(accessToken);
    await Firebase.auth().signInAndRetrieveDataWithCredential(credential);
  }
}

export function setIsLoggedIn(isLoggedIn) {
  return {
    type: ActionTypes.SET_IS_LOGGEDIN,
    isLoggedIn,
  };
}

export function setInvitationCode(invitationCode) {
  return async (dispatch) => {
    try {
      await AuthServices.setInvitationCode(invitationCode);
      dispatch({
        type: ActionTypes.SET_INVITATION_CODE,
        invitationCode,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
