import * as API from './api';

export function getPlace(id) {
  return API.get(`place/${id}`);
}
