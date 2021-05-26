import { CHANGE_SIGNIN_STATUS, CHANGE_SIGNIN_EMAIL, CHANGE_IS_NOTIFICATION} from "./actionTypes";

export const changeIsSignedInStatus = (status) => ({
  type: CHANGE_SIGNIN_STATUS, 
  status
});
export const changeIsSignedInEmail = (email) => ({
  type: CHANGE_SIGNIN_EMAIL, 
  email
});
export const changeIsNotification = (notificationId) => ({
  type: CHANGE_IS_NOTIFICATION, 
  notificationId
});
