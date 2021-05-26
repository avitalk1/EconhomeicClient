import { takeLatest, put, call } from "redux-saga/effects";
import { FETCH_USER_CONFIG } from "../actions/UserConfigAction/actionTypes";
import {getUserConfig} from '../../common/api'

import {
  fetchUserConfigSuccess,
  fetchUserConfigFail
} from "../actions/UserConfigAction/action";

function* onFetchUserConfig(action) {
  try {
    const response = yield call(getUserConfig, action.userid);
    yield put(fetchUserConfigSuccess(response));
  } catch (e) {
    yield put(fetchUserConfigFail(e));
  }
}

export function* fetchUserConfigSaga() {
  yield takeLatest(FETCH_USER_CONFIG, onFetchUserConfig);
}