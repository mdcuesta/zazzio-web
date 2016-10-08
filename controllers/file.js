import { Router } from 'express';
import ExpressValidation from 'express-validation';
import { CsrfProtected, AjaxSecure } from '../utilities/security';
import Upload from '../models/upload';
import User from '../models/user';
import * as StorageService from '../services/storage-service';
import * as ImageService from '../services/image-service';
import * as FileValidations from './validations/file-validations';

const appDomain = process.env.APP_DOMAIN || 'http://zazzio.something.awesome.com:3000';

export function getUploadPhotoCredentials(req, res, next) {
  Upload.initiateUpload('user-photo', req.user.id)
  .then((doc) => ImageService.getUploadPhotoCredentials({
    notification_url: `${appDomain}/file/photo/upload/complete/${doc.uploadId}`,
  })
  )
  .then((data) => {
    res.status(200).json(data);
  })
  .catch(next);
}

export function photoUploadComplete(req, res, next) {
  // TODO: verify signature
  const uploadId = req.params.uploadId;
  Upload.getByUploadId(uploadId)
  .then((doc) => {
    if (doc === null) {
      res.status(400).send('Bad request');
      return;
    }
    if (doc.type !== 'user-photo') {
      res.status(400).send('Bad request');
    } else {
      User.getById(doc.uploader)
      .then((user) => user.setProfilePhoto(req.body.public_id))
      .then(() => {
        res.status(200).send('success');
        return doc.complete();
      })
      .catch(next);
    }
  })
  .catch(next);
}

export function createUploadFileUrl(req, res, next) {
  StorageService.getUploadCredentials(req.body.fileType)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch(next);
}

const ajaxSecure = AjaxSecure;
const csrfProtected = CsrfProtected;
const expressRoute = Router;
const validateRequest = ExpressValidation;
const router = expressRoute();

router.post('/photo/upload/complete/:uploadId',
  validateRequest(FileValidations.UploadPhotoCompleteValidation),
  photoUploadComplete);

router.post('/photo/upload',
  csrfProtected(),
  ajaxSecure(),
  validateRequest(FileValidations.UploadPhotoValidation),
  getUploadPhotoCredentials);


/**
 * Exports router as default
 */
export default router;
