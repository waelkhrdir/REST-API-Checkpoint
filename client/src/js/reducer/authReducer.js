import {
    GET_PROFILE,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
  } from "../const";
  
  const intialState = {
    user: null,
    isLoading: null,
    token: null,
    error: null,
    isAuth: null,
  };
  
  const authReducer = (state = intialState, { type, payload }) => {
    switch (type) {
      case REGISTER_USER:
      case LOGIN_USER:
      case GET_PROFILE:
        return { ...state, isLoading: true };
  
      case LOGIN_USER_SUCCESS:
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          user: payload.user,
          token: payload.token,
          isLoading: false,
          isAuth: true,
        };
  
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          isAuth: true,
          isLoading: false,
          user: payload,
          error: null,
        };
      case LOGIN_USER_FAIL:
      case REGISTER_USER_FAIL:
      case GET_PROFILE_FAIL:
        return {
          ...state,
          user: null,
          isLoading: false,
          token: null,
          isAuth: false,
          error: payload,
        };
  
      case LOGOUT:
        return {
          ...state,
          user: null,
          isLoading: false,
          token: null,
          isAuth: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;