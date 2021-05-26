import { takeLatest, put, call } from "redux-saga/effects";
import { FETCH_NOTIFICATION_DATA } from "../actions/NotificationActions/actionTypes";
import {getNotifications} from '../../common/api'

import {
fetchNotificationSuccess, 
fetchNotificationFail
} from "../actions/NotificationActions/action";

function* onFetchNotifications(action) {
  try {
    const response = yield call(getNotifications, action.email);
  
    yield put(fetchNotificationSuccess(response));
  } catch (e) {
    yield put(fetchNotificationFail(e));
  }
}

export function* fetchNotificationSaga() {
  yield takeLatest(FETCH_NOTIFICATION_DATA, onFetchNotifications);
}