import {
  FETCH_USER_DATA,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAIL,
  FETCH_USER_DATA_UPDATE, 
  USER_DATA_UPDATE_CONSTRAINTS
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
    case USER_DATA_UPDATE_CONSTRAINTS:
      return {...state , data:{
        ...state.data,
        UserConstraints:{
          electricityBudget: data.electricityBudget,
          numberOfHouseMembers: data.numberOfHouseMembers,
          waterBudget: data.waterBudget
        }
      }, error: null, loading: false }
    case USER_DATA_UPDATE_CONSTRAINTS:
      return {...state , data:{
        ...state.data,
        AutomaticActions:{
          Light: data.Light,
          AirConditioner: data.AirConditioner,
          Boiler:data.Boiler, 
          WaterTap:data.WaterTap
        }
      }, error: null, loading: false }
    default:
      return state;
  }
};