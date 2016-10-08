import Dispatcher from '../dispatcher';
import * as FileApi from '../apis/user-photo-api';
import PhotoConstants from '../constants/user-photo-constants';
import { fail } from '../apis/utils';

export class FileActions {
  constructor() {
    this.initiatePhotoUpload = this.initiatePhotoUpload.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.initiatePhotoUploadComplete = this.initiatePhotoUploadComplete.bind(this);
  }

  // User Photo Upload
  initiatePhotoUpload(file) {
    const fileType = 'jpg';
    Dispatcher.dispatchServerAction({
      actionType: PhotoConstants.PHOTO_UPLOAD_PROGRESS,
      progress: 0,
    });
    FileApi.initiatePhotoUpload(fileType)
    .done((response) => {
      this.beginPhotoUpload(response, file);
      this.initiatePhotoUploadComplete(response);
    })
    .fail(fail);
  }

  initiatePhotoUploadComplete(data) {
    Dispatcher.dispatchServerAction({
      actionType: PhotoConstants.INITIATE_PHOTO_UPLOAD_COMPLETE,
      data,
    });
  }

  uploadPhoto(file) {
    this.initiatePhotoUpload(file);
  }

  beginPhotoUpload(credentials, file) {
    const params = credentials.uploadParams;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', params.api_key);
    formData.append('signature', params.signature);
    formData.append('timestamp', params.timestamp);
    formData.append('notification_url', params.notification_url);
    FileApi.uploadPhoto(credentials.uploadUrl, formData, () => {
      const xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          const percentComplete = evt.loaded / evt.total;
          Dispatcher.dispatchServerAction({
            actionType: PhotoConstants.PHOTO_UPLOAD_PROGRESS,
            progress: Math.floor(percentComplete * 100),
          });
        }
      }, false);
      return xhr;
    });
  }

  uploadPhotoComplete(data) {
    Dispatcher.dispatchServerAction({
      actionType: PhotoConstants.PHOTO_UPLOAD_COMPLETE,
      data,
    });
  }
}

export default new FileActions();
