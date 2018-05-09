import { SecureStore } from 'expo';
import * as API from './api';

export function setToken(token) {
  return SecureStore.setItemAsync('token', token);
}

export function getToken() {
  return SecureStore.getItemAsync('token');
}

export function deleteToken() {
  return SecureStore.deleteItemAsync('token');
}

export function setInvitationCode(code) {
  return SecureStore.setItemAsync('invitationCode', code);
}

export function getInvitationCode() {
  return SecureStore.getItemAsync('invitationCode');
}

export function deleteInvitationCode() {
  return SecureStore.deleteItemAsync('invitationCode');
}

export function verifyInvitationCode(code) {
  return API.get(`api/auth/invitation?code=${code}`);
}

export async function loginOAuth(accessToken) {
  const response = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=email,first_name,last_name,picture`);
  const userData = await response.json();

  console.log('== Login facebook ==');
  console.log(userData);

  const { id: uid, email, first_name, last_name, picture } = userData;

  return API.post('api/auth/facebook', {
    accessToken,
    uid,
    email,
    first_name,
    last_name,
    image_url: picture && picture.data ? picture.data.url : '',
  });
}
