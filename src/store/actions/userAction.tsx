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
import IUserData from '../../models/IUserData';

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

      if (!response.ok) {
        const data = await response.json();
        const error = data.error.message;
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error,
        });
      }

      const data = await response.json();
      console.log("first response success")
      const response2 = await fetch("https://react-http-e8d06-default-rtdb.firebaseio.com/users.json");

      if(!response2.ok){
        console.log("response 2 not ok")
        const data2 = await response.json();
        const error2 = data2.error.message;
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error2,
        });
      }
      const data2 = await response2.json();
      console.log("second response successful");
      console.log(data2);
      try{
        const ourUser = data2.filter((user:any) => user.email !== "testreact@gmail.com");
        console.log(ourUser);
      }catch(error){
        console.log("our user fail");
      }
      

      


      const userData = {
        isLoggedIn: true,
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
      isLoggedIn: false,
      idToken: undefined,
      email: undefined,
      refreshToken: undefined,
      expiresIn: undefined,
      localId: undefined,
      registered: undefined,
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