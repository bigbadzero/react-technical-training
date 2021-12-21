import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export interface UserState {
  loading?: boolean;
  error?: string;
  userInfo:UserInfo;
}

export interface UserInfo{
      isLoggedIn: boolean;
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

const initUserInfo:UserInfo = {
  isLoggedIn: false,
}

const initState:UserState = {
  loading: false, 
  error: undefined,
  userInfo: initUserInfo
}


export const userLoginReducer = (state: UserState = initState, action: Action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT: 
      return {loading: false,  userInfo: action.payload};
    default:
      return state;
  }
};
