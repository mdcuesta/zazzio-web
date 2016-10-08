import Url from '../helpers/url-helper';
import Actions from '../actions/user-photo-actions';
import * as Utils from './utils';

export function initiatePhotoUpload(fileType) {
  return Utils.post(Url.action('file/photo/upload'), {
    fileType,
  });
}

export function uploadPhoto(url, data, xhr) {
  Utils.postForm(url, data, xhr)
  .done((response) => {
    Actions.uploadPhotoComplete(response);
  })
  .fail(Utils.fail);
}
