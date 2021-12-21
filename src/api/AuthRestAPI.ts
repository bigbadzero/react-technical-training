import axios from "axios";
import LoginResponse from "../models/LoginResponse";

const FirebaseLogin = async (
  url: string,
  email: string | undefined,
  password: string | undefined
) => {
  axios
    .post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
};


