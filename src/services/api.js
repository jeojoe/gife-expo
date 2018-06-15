import axios from 'axios';
import Config from '../../app.json';

function genEndpoint(path) {
  return `${Config.aws.LAMBDA_URL}/dev/${path}`;
}

export function mock() {
  return fetch('http://www.mocky.io/v2/5a996cbf2e0000e331553680')
    .then(res => res.json());
}

export function get(path) {
  return axios.get(genEndpoint(path), {
    headers: { 'x-api-key': Config.aws.API_KEY },
  });
}

export function post(path, body) {
  return axios.post(genEndpoint(path), body, {
    headers: { 'x-api-key': Config.aws.API_KEY },
  });
}
