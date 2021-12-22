import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducer";

const reducers = combineReducers({
  userLogin: userLoginReducer,
});
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : undefined;

const questionInfo = localStorage.getItem("questionInfo")
 ? JSON.parse(localStorage.getItem("questionInfo")!)
 : undefined;

const initialState = {
  userLogin: { userInfo, questionInfo },
} as {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
