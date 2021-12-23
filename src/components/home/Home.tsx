import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : null;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return <h1>Home Page</h1>;
};
export default Home;
