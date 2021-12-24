import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_FAIL_ACKNOWLEDGED,
  UPDATE_QUESTIONS_REQUEST,
  UPDATE_QUESTIONS_SUCCESS,
  UPDATE_QUESTIONS_FAIL
} from "../constants/userConstants";

export interface UserState {
  loading?: boolean;
  error?: string;
  userInfo: {
    firstName?: string;
    lastName?: string;
    birthday?: Date;
    question1?: number;
    question2?: number;
    question3?: number;
    token?: string;
    timeout?: number;
    email?: string;
    completionDate?: Date;
  };
}
interface Action {
  type: string;
  payload?: string;
}

export const userLoginReducer = (
  state: UserState = { userInfo: {} },
  action: Action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL_ACKNOWLEDGED:
      return { loading: false, error: undefined };
    case UPDATE_QUESTIONS_REQUEST:
      return {loading: true};
    case UPDATE_QUESTIONS_SUCCESS:
        return {loading: false, userInfo: action.payload };
      case UPDATE_QUESTIONS_FAIL:
        return {loading: false, error: action.payload};
    default:
      return state;
  }
};
