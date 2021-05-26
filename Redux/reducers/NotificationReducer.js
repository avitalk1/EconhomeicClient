import {
  FETCH_NOTIFICATION_DATA, FETCH_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAIL, NOTIFICATION_UPDATE, ADD_NOTIFICATION
} from "../actions/NotificationActions/actionTypes";


export default (
  state = { data: null, error: null, loading: false },
  { type, data, error }
) => {
  switch (type) {
    case FETCH_NOTIFICATION_DATA:
      return { ...state, error: null, loading: true };
    case FETCH_NOTIFICATION_SUCCESS:
      return { ...state, data, error: null, loading: false };
    case FETCH_NOTIFICATION_FAIL:
      return { ...state, data: {}, error, loading: false };
    case NOTIFICATION_UPDATE:
      return {
        ...state ,
         data:state.data.map(notification=>{
           if(notification.NotificationsID == data.notificationId){
             return{...notification, readAt: data.dateRead}
           }
           return notification
         })
        
        , error: null,
         loading: false
         }
    case ADD_NOTIFICATION:
      return {
        ...state ,
        data: [...state.data, data.notification], 
         error: null, 
         loading: false }
    default:
      return state;
  }
};