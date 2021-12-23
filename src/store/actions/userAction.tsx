import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_FAIL_ACKNOWLEDGED,
  USER_DATA_REQUEST
} from "../constants/userConstants";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../index";

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
          password: password
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        const error = data.error.message;
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error,
        });
      }
      const data = await response.json();
      const userData = {
        firstName: data.results.firstName,
        lastName: data.results.lastName,
        birthday: data.results.birthday,
        question1: data.results.question1,
        question2: data.results.question2,
        question3: data.results.question3,
        token: data.results.token,
        timeout: data.results.timeout,
        email:data.results.email
      };
      //pass this data to the reducer in the payload of the action
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });
      localStorage.setItem("userInfo", JSON.stringify(userData));
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

export const logout =
  (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    const userData = {
      firstName: undefined,
        lastName: undefined,
        birthday: undefined,
        question1: undefined,
        question2: undefined,
        question3: undefined,
        token: undefined,
        timeout: undefined,
        email:undefined
    };

    localStorage.removeItem("userInfo");

    dispatch({
      type: USER_LOGOUT,
      action: userData,
    });
  };

  export const userLoginFailAcknowled =
  (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {

    localStorage.removeItem("userInfo");

    dispatch({
      type: USER_LOGIN_FAIL_ACKNOWLEDGED,
    });
  };

  // export const submitUserBasicInfo =
  // (name:string, birthday:Date): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  // async (
  //   dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  // ): Promise<void> =>{
  //   try{
  //     dispatch({
  //       type: USER_DATA_REQUEST,
  //     });

  //     //fetch data from backend
  //     const response = await fetch("https://react-http-e8d06-default-rtdb.firebaseio.com/users.json", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: name,
  //         birthday: birthday,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);


      

  //   }catch(error){

  //   }
  // }
