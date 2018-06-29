import { Firebase } from '../services';

export function getCurrentUser() {
  return new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

export function getIdToken() {
  return Firebase.auth().currentUser.getIdToken();
}
