import { ActionTypes } from '../constants';
import { AuthServices, Firebase } from '../services';

import { UserActions } from '../actions';

export function loginFacebook(accessToken) {
  return async (dispatch) => {
    const credential = Firebase.auth.FacebookAuthProvider.credential(accessToken);
    const authUserData = await Firebase.auth().signInAndRetrieveDataWithCredential(credential);
    console.log('== this is auth user data ==', authUserData);

    dispatch(UserActions.setAuthUser(authUserData));
  };
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
