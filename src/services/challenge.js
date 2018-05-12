import * as API from './api';

export function getExplore() {
  return API.get('api/challenge/explore');
}
