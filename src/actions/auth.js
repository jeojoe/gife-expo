import { ActionTypes } from '../constants';
import { AuthServices, Firebase } from '../services';

import { UserActions } from '../actions';

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

export function loginFacebook(accessToken) {
  return async (dispatch) => {
    const credential = Firebase.auth.FacebookAuthProvider.credential(accessToken);
    const currentUserData = await Firebase.auth().signInAndRetrieveDataWithCredential(credential);
    const token = await Firebase.auth().currentUser.getIdToken();
    const temp = { uid: currentUserData.user.uid };
    // Login to GIFE server
    console.log('This is temp', temp);
    await AuthServices.loginOAuth(token, temp);
    // Set current user data
    dispatch(UserActions.setCurrentUser(currentUserData));
  };
}

export function signOut() {
  return async (dispatch) => {
    await Firebase.auth().signOut();
    dispatch(setIsLoggedIn(false));
    dispatch(UserActions.setCurrentUser(null));
  };
}
