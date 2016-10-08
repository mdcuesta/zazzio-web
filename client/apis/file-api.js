import Url from '../helpers/url-helper';
import Actions from '../actions/file-actions';
import * as Utils from './utils';

export function initiatePhotoUpload(fileType) {
  return Utils.post(Url.action('file/photo/upload'), {
    fileType,
  });
}

export function uploadPhoto(url, data) {
  Utils.postForm(url, data)
  .done((response) => {
    Actions.uploadPhotoComplete(response);
  })
  .fail(Utils.fail);
}
