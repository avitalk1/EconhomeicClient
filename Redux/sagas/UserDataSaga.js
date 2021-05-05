import { takeLatest, put, call } from "redux-saga/effects";
import { FETCH_USER_DATA } from "../actions/UserDataActions/actionTypes";
import {getUserInfo} from '../../common/api'

import {
  fetchUserDataSuccess,
  fetchUserDataFail
} from "../actions/UserDataActions/action";

function* onFetchUserData(action) {
  try {
    const response = yield call(getUserInfo, action.email);
    yield put(fetchUserDataSuccess(response.user));
  } catch (e) {
    yield put(fetchUserDataFail(e));
  }
}

export function* fetchUserDataSaga() {
  yield takeLatest(FETCH_USER_DATA, onFetchUserData);
}