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
      return 'The mobile number already exist.';
    case 2:
      return 'The mobile number does not exist.';
    case 3:
      return 'Invalid mobile number';
    case 4:
      return 'Invalid verification code.';
    case 5:
      return 'Number is already verified.';
    case 6:
      return 'Please wait 5 minutes before resending verification code.';
    case 10:
      return 'Sorry an error occured. Please try again later.';
    default:
      return '';
  }
}
