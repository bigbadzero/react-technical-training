import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import { Fragment } from "react";
import { updateQuestions } from "../../store/actions/userAction";

const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : null;
  const answer1 = userInfo ? userInfo.question1 : null;
  const answer2 = userInfo ? userInfo.question2 : null;
  const answer3 = userInfo ? userInfo.question3 : null;

  const submitAnswerHandler =
    (question: number, answer: number, userState: UserState) => () => {
      dispatch(updateQuestions(question, answer, userState));
    };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Fragment>
      {!answer1 && !answer2 && !answer3 ? (
        <Question1 submitAnswer={submitAnswerHandler} />
      ) : null}
      {answer1 && !answer2 && !answer3 ? (
        <Question2 submitAnswer={submitAnswerHandler} />
      ) : null}
      {answer1 && answer2 && !answer3 ? (
        <Question3 submitAnswer={submitAnswerHandler} />
      ) : null}
      {answer1 && answer2 && answer3 ? <h1>All Questions Answered</h1> : null}
    </Fragment>
  );
};
export default Questions;
