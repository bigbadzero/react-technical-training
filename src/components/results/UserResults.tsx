import { Table } from "react-bootstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import IUserData from "../../models/IUserData";
import TableData from "./TableData";
import { Button } from "react-bootstrap";
import { Fragment } from "react";
import { resetAllQuestions } from "../../store/actions/userAction";
;


const UserResults = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;

  const user: IUserData = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    birthday: userInfo.birthday,
    completionDate: userInfo.completionDate,
    question1: userInfo.question1,
    question2: userInfo.question2,
    question3: userInfo.question3,
    token: userInfo.token,
    timeout: userInfo.timeout
  };

  const resetAnswersHandler = () => {
    dispatch(resetAllQuestions(user));
  };

  return (
    <Fragment>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthday</th>
            <th>Completion Date</th>
            <th>Body Age</th>
          </tr>
        </thead>
        <tbody>
          <TableData user={user} />
        </tbody>
      </Table>
      <Button onClick={resetAnswersHandler} variant="danger">
        Retake Quiz
      </Button>
    </Fragment>
  );
};
export default UserResults;
