import { FETCH_NOTIFICATION_DATA, FETCH_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAIL, NOTIFICATION_UPDATE, ADD_NOTIFICATION } from "./actionTypes";

export const fetchNotificationData = (email) => ({
  type: FETCH_NOTIFICATION_DATA, 
  email
});
export const fetchNotificationSuccess = (data) => ({
  type: FETCH_NOTIFICATION_SUCCESS,
  data
});
export const fetchNotificationFail = (error) => ({
  type: FETCH_NOTIFICATION_FAIL,
  error
});
export const notificationUpdate = (data) => ({
  type: NOTIFICATION_UPDATE, 
  data
});
export const addNotification = (data) => ({
  type: ADD_NOTIFICATION, 
  data
});
