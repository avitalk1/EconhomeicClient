import {
  FETCH_USER_CONFIG, 
  FETCH_USER_CONFIG_SUCCESS,
  FETCH_USER_CONFIG_FAIL,
  USER_CONFIG_UPDATE
} from "../actions/UserConfigAction/actionTypes"


export default (
  state = { data: null, error: null, loading: false },
  { type, data, error }
) => {
  switch (type) {
    case FETCH_USER_CONFIG:
      return { ...state, error: null, loading: true };
    case FETCH_USER_CONFIG_SUCCESS:
      return { ...state, data, error: null, loading: false };
    case FETCH_USER_CONFIG_FAIL:
      return { ...state, data: {}, error, loading: false };
    case USER_CONFIG_UPDATE:
      return {...state , ...state.data, error: null, loading: false }
    default:
      return state;
  }
};