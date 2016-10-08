import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import PhotoConstants from '../constants/user-photo-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class UserPhotoStore extends EventEmitter {
  constructor() {
    super();
    this.userProfilePhoto = null;
    this.photoUploadProgress = 0;
    this.getUserProfilePhoto = this.getUserProfilePhoto.bind(this);
    this.setUserProfilePhoto = this.setUserProfilePhoto.bind(this);
    this.setPhotoUploadProgress = this.setPhotoUploadProgress.bind(this);
    this.getPhotoUploadProgress = this.getPhotoUploadProgress.bind(this);
  }

  getUserProfilePhoto() {
    return this.userProfilePhoto;
  }

  setUserProfilePhoto(photo) {
    this.userProfilePhoto = photo;
  }

  getPhotoUploadProgress() {
    return this.photoUploadProgress;
  }

  setPhotoUploadProgress(progress) {
    this.photoUploadProgress = progress;
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const userPhotoStore = new UserPhotoStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case PhotoConstants.PHOTO_UPLOAD_COMPLETE:
      userPhotoStore.setUserProfilePhoto(action.data.public_id);
      break;
    case PhotoConstants.PHOTO_UPLOAD_PROGRESS:
      userPhotoStore.setPhotoUploadProgress(action.progress);
      break;
    default:
      return true;
  }
  userPhotoStore.emit(CHANGE_EVENT);
  return true;
});

export default userPhotoStore;
