import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import FileConstants from '../constants/file-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class UserPhotoStore extends EventEmitter {
  constructor() {
    super();
    this.userProfilePhoto = null;
    this.getUserProfilePhoto = this.getUserProfilePhoto.bind(this);
    this.setUserProfilePhoto = this.setUserProfilePhoto.bind(this);
  }

  getUserProfilePhoto() {
    return this.userProfilePhoto;
  }

  setUserProfilePhoto(photo) {
    this.userProfilePhoto = photo;
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
    case FileConstants.PHOTO_UPLOAD_COMPLETE:
      userPhotoStore.setUserProfilePhoto(action.data.public_id);
      break;
    default:
      return true;
  }
  userPhotoStore.emit(CHANGE_EVENT);
  return true;
});

export default userPhotoStore;
