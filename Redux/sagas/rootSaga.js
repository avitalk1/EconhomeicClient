import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import userConfig from '../reducers/UserConfigReducer'
import userData from "../reducers/UserDataReducer";
import isSignedIn from "../reducers/IsSignedInReducer"
import notificationsData from "../reducers/NotificationReducer"
import { fetchNotificationSaga } from "./NotificationSaga";
import { fetchUserDataSaga } from "./UserDataSaga";
import { fetchUserConfigSaga} from './UserConfigSaga'
function* saga() {
  yield all([fetchUserDataSaga(), fetchUserConfigSaga(), fetchNotificationSaga()]);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  userData, 
  isSignedIn, 
  notificationsData,
  userConfig

});

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);