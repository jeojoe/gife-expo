import { Firebase } from '../services';

export function getCurrentUser() {
  return new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}
