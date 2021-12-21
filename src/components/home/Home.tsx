import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { UserState } from "../../reducers/userReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const isLoggedIn = userInfo ? userInfo.isLoggedIn : null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  return <h1>Home Page</h1>;
};
export default Home;
