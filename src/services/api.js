import Config from '../../app.json';

function genEndpoint(apiId) {
  return `https://${apiId}/${Config.gife.LAMBDA_URL}/stag`;
}

export function mock() {
  return fetch('http://www.mocky.io/v2/5a996cbf2e0000e331553680')
    .then(res => res.json());
}

export function get(url) {
  return fetch(genEndpoint(url));
}

export function post(url, body) {
  return fetch(genEndpoint(url), {
    method: 'POST',
    body,
  })
    .then(res => res.json());
}
