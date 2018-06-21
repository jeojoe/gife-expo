import { ActionTypes } from '../constants';

export function showStartChallengeModal(challenge) {
  return {
    type: ActionTypes.SHOW_START_CHALLENGE_MODAL,
    challenge,
  };
}

export function hideStartChallengeModal() {
  return {
    type: ActionTypes.HIDE_START_CHALLENGE_MODAL,
  };
}
