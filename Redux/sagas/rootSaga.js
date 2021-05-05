import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userData from "../reducers/UserDataReducer";

import { fetchUserDataSaga } from "./UserDataSaga";
function* saga() {
  yield all([fetchUserDataSaga()]);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  userData
});

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);