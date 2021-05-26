import {
    CHANGE_SIGNIN_STATUS,
    CHANGE_SIGNIN_EMAIL, 
    CHANGE_IS_NOTIFICATION
  } from "../actions/IsSignedInActions/actionTypes";
  export default (
    state = { status: null, email:null, notificationId:false },
    { type, status, email, notificationId}
  ) => {
    switch (type) {
      case CHANGE_SIGNIN_STATUS:
        return { ...state, status };
      case CHANGE_SIGNIN_EMAIL:
        return { ...state , email};
      case CHANGE_IS_NOTIFICATION:
        return { ...state , notificationId};
      
      default:
        return state;
    }
  };