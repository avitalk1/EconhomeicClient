import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import userData from "../reducers/UserDataReducer";
import userConfig from '../reducers/UserConfigReducer'
import { fetchUserDataSaga } from "./UserDataSaga";
import { fetchUserConfigSaga} from './UserConfigSaga'
function* saga() {
  yield all([fetchUserDataSaga(), fetchUserConfigSaga()]);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  userData, 
  userConfig
});

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);