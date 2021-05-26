import { FETCH_USER_CONFIG, FETCH_USER_CONFIG_SUCCESS, FETCH_USER_CONFIG_FAIL, USER_CONFIG_UPDATE } from "./actionTypes";

export const fetchUserConfig = (userid) => ({
  type: FETCH_USER_CONFIG, 
  userid
});
export const fetchUserConfigSuccess = (data) => ({
  type: FETCH_USER_CONFIG_SUCCESS,
  data
});
export const fetchUserConfigFail = (error) => ({
  type: FETCH_USER_CONFIG_FAIL,
  error
});
export const userConfigUpdate = (data) => ({
  type: USER_CONFIG_UPDATE, 
  data
});