import { ActionTypes } from '../constants';

export function showStartChallengeModal() {
  return {
    type: ActionTypes.SHOW_START_CHALLENGE_MODAL,
  };
}

export function hideStartChallengeModal() {
  return {
    type: ActionTypes.HIDE_START_CHALLENGE_MODAL,
  };
}
