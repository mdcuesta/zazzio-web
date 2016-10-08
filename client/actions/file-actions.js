import Dispatcher from '../dispatcher';
import * as FileApi from '../apis/file-api';
import FileConstants from '../constants/file-constants';
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
    FileApi.initiatePhotoUpload(fileType)
    .done((response) => {
      this.beginPhotoUpload(response, file);
      this.initiatePhotoUploadComplete(response);
    })
    .fail(fail);
  }

  initiatePhotoUploadComplete(data) {
    Dispatcher.dispatchServerAction({
      actionType: FileConstants.INITIATE_PHOTO_UPLOAD_COMPLETE,
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
    FileApi.uploadPhoto(credentials.uploadUrl, formData);
  }

  uploadPhotoComplete(data) {
    Dispatcher.dispatchServerAction({
      actionType: FileConstants.PHOTO_UPLOAD_COMPLETE,
      data,
    });
  }
}

export default new FileActions();
