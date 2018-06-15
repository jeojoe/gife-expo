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
  return API.get(`auth/invitation?code=${code}`);
}

export function loginOAuth(token, temp) {
  return API.post('auth/login/oauth', { token, temp });
}
