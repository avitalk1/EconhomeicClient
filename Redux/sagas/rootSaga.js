import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userData from "../reducers/UserDataReducer";
import isSignedIn from "../reducers/IsSignedInReducer"
import notificationsData from "../reducers/NotificationReducer"
import { fetchUserDataSaga } from "./UserDataSaga";
import { fetchNotificationSaga } from "./NotificationSaga";
function* saga() {
  yield all([fetchUserDataSaga(), fetchNotificationSaga()]);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  userData, 
  isSignedIn, 
  notificationsData
});

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);