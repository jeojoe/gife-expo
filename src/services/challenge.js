import * as API from './api';

export function getExplore() {
  return API.get('challenge/explore');
}

export function getChallenge(id) {
  return API.get(`challenge/${id}`);
}
