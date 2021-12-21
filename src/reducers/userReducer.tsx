import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export interface UserState {
  loading?: boolean;
  error?: string;
  isLoggedIn: boolean;
  userInfo:UserInfo;
}

export interface UserInfo{
      idToken?:string;
      email?:string;
      refreshToken?: string;
      expiresIn?: string;
      localId?: string;
      registered?: boolean;
}

interface Action {
  type: string;
  payload?: UserInfo;
}

const initState:UserState = {
  loading: false, 
  error: undefined,
  isLoggedIn: false,
  userInfo: {}
}

export const userLoginReducer = (state: UserState = initState, action: Action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, isLoggedIn:true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
