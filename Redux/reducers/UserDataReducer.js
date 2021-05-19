import {
  FETCH_USER_DATA,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAIL,
  FETCH_USER_DATA_UPDATE
} from "../actions/UserDataActions/actionTypes";


export default (
  state = { data: null, error: null, loading: false },
  { type, data, error }
) => {
  switch (type) {
    case FETCH_USER_DATA:
      return { ...state, error: null, loading: true };
    case FETCH_USER_DATA_SUCCESS:
      return { ...state, data, error: null, loading: false };
    case FETCH_USER_DATA_FAIL:
      return { ...state, data: {}, error, loading: false };
    case FETCH_USER_DATA_UPDATE:
      return {...state , ...state.data, error: null, loading: false }
    default:
      return state;
  }
};