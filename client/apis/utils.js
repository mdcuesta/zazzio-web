import ErrorActions from '../actions/error-actions';

export function post(url, data) {
  return $.ajax({
    url,
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
  });
}

export function fail() {
  ErrorActions.error();
}
