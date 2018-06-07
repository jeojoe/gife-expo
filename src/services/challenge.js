import * as API from './api';

export function getExplore() {
  return API.get('challenge/explore');
}
