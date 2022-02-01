import axios from "axios";
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

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: REGISTER_USER });
  try {
    const { data } = await axios.post("/api/register", user);
    // data = {user:{},token}
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: { msg: error.response.data.err, id: "register" },
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });
  try {
    const { data } = await axios.post("/api/login", user);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: { msg: error.response.data.err, id: "login" },
    });
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE });
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const { data } = await axios.get("/api/current", config);
    // data =user
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, payload: error.response.data });
  }
};

//lOGOUT
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};