import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_FAIL_ACKNOWLEDGED,
  UPDATE_QUESTIONS_REQUEST,
  UPDATE_QUESTIONS_SUCCESS,
  UPDATE_QUESTIONS_FAIL,
} from "../constants/userConstants";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../index";
import { UserState } from "../../store/reducers/userReducer";

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
        email: data.results.email,
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
      email: undefined,
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

export const updateQuestions =
  (
    question: number,
    answer: number,
    userState: UserState
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {

    console.log("in update Questions")
    try {
      dispatch({
        type: UPDATE_QUESTIONS_REQUEST,
      });

      if (question === 1) {
        userState.userInfo.question1 = answer;
      }
      if (question === 2) {
        userState.userInfo.question2 = answer;
      }
      if (question === 3) {
        userState.userInfo.question3 = answer;
      }

      //fetch data from backend
      const response = await fetch(
        "https://localhost:44372/api/Account/answers",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: userState.userInfo.firstName,
            lastName: userState.userInfo.lastName,
            birthday: userState.userInfo.birthday,
            question1: userState.userInfo.question1,
            question2: userState.userInfo.question2,
            question3: userState.userInfo.question3,
            token: userState.userInfo.token,
            timeout: userState.userInfo.timeout,
            email: userState.userInfo.email,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        const error = data.error.message;
        dispatch({
          type: UPDATE_QUESTIONS_FAIL,
          payload: error,
        });
      }
      const data = await response.json();
      console.log(data);
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        question1: data.question1,
        question2: data.question2,
        question3: data.question3,
        token: data.token,
        timeout: data.timeout,
        email: data.email,
      };
      //pass this data to the reducer in the payload of the action
      dispatch({
        type: UPDATE_QUESTIONS_SUCCESS,
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
