import { URL_AUTH_SIGN_UP, URL_AUTH_SIGN_IN } from "../../constants/database";

export const SIGN_UP = "SIGN_UP"
export const SIGN_IN = "SIGN_IN"

export const signup = (email, password) => {
    return async (dispatch) => {
      try {
        const response = await fetch(URL_AUTH_SIGN_UP, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        });
        const data = await response.json();
        console.warn(data);
  
        dispatch({
          type: SIGN_UP,
          token: data.idToken,
          userId: data.localId,
        });
      } catch (error) {
        console.warn(error);
      }
    };
  };

export const signin = (email, password) => {
    return async (dispatch) => {
      try {
        const response = await fetch(URL_AUTH_SIGN_IN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        });
        const data = await response.json();
        console.warn(data);
        dispatch({
          type: SIGN_IN,
          token: data.idToken,
          userId: data.localId,
        });
      } catch (error) {
        console.warn(error);
      }
    };
  };