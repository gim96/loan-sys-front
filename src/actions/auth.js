import axios from "axios";
import { useHistory } from "react-router-dom";
import { getSource } from "../pages/db/server";
import {token_header} from "../utils/tokenHeader";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("user_token");
    localStorage.removeItem("authenticated");
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  // let history = this.useHistory();

  return (dispatch) => {
    dispatch(receiveLogin());
    // var config = {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",

    //   },
    // };
    if (creds.email.length > 0 && creds.password.length > 0) {
      console.log('log');
      axios
        .post(getSource() + "/oauth/token", {
            user:{
            username: creds.email,
            password: creds.password,
          },
          auth_type:'password'
        })
        .then((response) => {
          console.log(response);
          if (response.data.success === true) {

            localStorage.setItem("user_token", response.data.payload.access_token);
            localStorage.setItem("authenticated", true);
            ///
            axios.get(`${getSource()}/users/me`, token_header)
            .then((resp) => {

              const user = resp.data.payload && resp.data.payload[0];
              localStorage.setItem("user", JSON.stringify(user));

              window.location.reload(true);
              
            })  
            .catch((err) => {
                console.log(err);
            })

           
          }
        });
    } else {
      dispatch(loginError("Something was wrong. Try again"));
    }
  };
}
