import Raven from 'raven-js';

export function post(url, data) {
  return $.ajax({
    url,
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
  });
}

export function get(url) {
  return $.ajax({
    url,
    type: 'get',
  });
}

export function fail(xhr, status, error) {
  if (xhr.status === 401) {
    location.reload(true);
    return;
  }
  Raven.captureException(error);
}
