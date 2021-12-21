import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST
} from "../constants/userConstants";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store/index";
import {UserInfo} from "../reducers/userReducer";

export const login =
  (
    url: string,
    email: string | undefined,
    password: string | undefined
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      //fetch data from backend
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      // if(!response.ok){
      //   const errorMessage:string = "bad resonse";
      //   throw new Error(errorMessage);
      // }

      const data = await response.json();
      const userData:UserInfo = {
        idToken: data.idToken,
        email: data.email,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        localId: data.localId,
        registered: data.registered,
      };

      //pass this data to the reducer in the payload of the action
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });
    } catch (error) {
      // User login fail
    //   dispatch({
    //     type: USER_LOGIN_FAIL,
    //     payload:
    //       error.response && error.response.data.message
    //         ? error.response.data.message
    //         : error.message,
    //   });
    }
  };
