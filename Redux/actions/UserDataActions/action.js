import { FETCH_USER_DATA, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAIL,FETCH_USER_DATA_UPDATE, USER_DATA_UPDATE_CONSTRAINTS, USER_DATA_UPDATE_AUTOACTIONS } from "./actionTypes";

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
export const userDataUpdate = (data) => ({
  type: FETCH_USER_DATA_UPDATE, 
  data
});
export const userDataUpdateConstraints = (data) => ({
  type: USER_DATA_UPDATE_CONSTRAINTS, 
  data
});
export const userDataUpdateAutoactions = (data) => ({
  type: USER_DATA_UPDATE_AUTOACTIONS, 
  data
});