import { FETCH_USER_DATA, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAIL } from "./actionTypes";

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