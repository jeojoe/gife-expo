import { ActionTypes } from '../constants';

export function startLoading() {
  return {
    type: ActionTypes.SET_IS_LOADING,
    isLoading: true,
  };
}

export function endLoading() {
  return {
    type: ActionTypes.SET_IS_LOADING,
    isLoading: false,
  };
}
