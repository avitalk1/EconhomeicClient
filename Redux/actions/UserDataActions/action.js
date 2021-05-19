import { FETCH_USER_DATA, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAIL,USER_DATA_UPDATE } from "./actionTypes";

export const userDataUpdate = (data) => ({
  type: USER_DATA_UPDATE, 
  data
});
export const fetchUserData = (email) => ({
  type: FETCH_USER_DATA, 
  email
});
export const fetchUserDataSuccess = (data) => ({
  type: FETCH_USER_DATA_SUCCESS,
  data
});
export const fetchUserDataFail = (error) => ({
  type: FETCH_USER_DATA_FAIL,
  error
});