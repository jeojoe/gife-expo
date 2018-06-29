import * as API from './api';
import { getIdToken, getCurrentUser } from './user';

export function getExplore() {
  return API.get('challenge/explore');
}

export function getChallenge(id) {
  return API.get(`challenge/${id}`);
}

export async function startChallenge(challengeId) {
  let token;
  let currentUserData;

  try {
    [token, currentUserData] = await Promise.all([
      getIdToken(),
      getCurrentUser(),
    ]);
  } catch (err) {
    return Promise.reject(Error('Fail to get user credentials!'));
  }

  return API.post('challenge/start', {
    challengeId,
    token,
    temp: { uid: currentUserData.uid },
  });
}
