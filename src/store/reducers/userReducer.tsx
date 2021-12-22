import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_FAIL_ACKNOWLEDGED,
} from "../constants/userConstants";

export interface UserState {
  loading?: boolean;
  error?: string;
  userInfo: {
    isLoggedIn?: boolean;
    idToken?: string;
    email?: string;
    refreshToken?: string;
    expiresIn?: string;
    localId?: string;
    registered?: boolean;
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
      return {loading: false, error: undefined}
    default:
      return state;
  }
};
