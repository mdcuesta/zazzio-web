const RES_STATUS = require(`../../localization/${process.env.LOCALE}/user-phone-numbers-status`);

/**
     * Status
     * 0 - Success
     * 1 - Number exists
     * 2 - Number does not exist
     * 3 - Verification Request Failed
     * 4 - Verification Failed
     * 5 - Number already verified
     */
export default function getStatusMessage(status) {
  switch (status) {
    case 0:
      return '';
    case 1:
      return RES_STATUS.mobileNumberExists;
    case 2:
      return RES_STATUS.mobileNumberDontExist;
    case 3:
      return RES_STATUS.invalidMobileNumber;
    case 4:
      return RES_STATUS.invalidVerificationCode;
    case 5:
      return RES_STATUS.numberVerified;
    case 6:
      return RES_STATUS.verificationWait;
    case 10:
      return RES_STATUS.errorOccured;
    default:
      return '';
  }
}
