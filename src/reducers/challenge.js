import { ActionTypes } from '../constants';

export const challengeDataStartChallengeModal = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_START_CHALLENGE_MODAL:
      return action.challenge;
    case ActionTypes.HIDE_START_CHALLENGE_MODAL:
      return null;
    default:
      return state;
  }
};

export const isStartChallengeModalVisible = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_START_CHALLENGE_MODAL:
      return true;
    case ActionTypes.HIDE_START_CHALLENGE_MODAL:
      return false;
    default:
      return state;
  }
};
