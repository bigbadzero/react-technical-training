import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : null;
  console.log("hi");

  useEffect(() => {
      if(!token){
          navigate("/login")
      }
  },[token,navigate])

  return <div>questions</div>;
};
export default Questions;
