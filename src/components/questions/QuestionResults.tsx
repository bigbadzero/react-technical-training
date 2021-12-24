import { Table } from "react-bootstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector } from "react-redux";

const QuestionResults = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const birthDay =  new Date(userInfo.birthday as Date).toLocaleDateString('en-US');
  const completionDate = new Date(userInfo.completionDate as Date).toLocaleDateString('en-US');
  const offset: number = (userInfo.question1 as number) + (userInfo.question2 as number) + (userInfo.question3 as number);
  const bodyAge =  new Date(userInfo.completionDate as Date).getFullYear() - new Date(userInfo.birthday as Date).getFullYear() + offset;
  

  return (
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
        <tr>
          <td>{userInfo.firstName}</td>
          <td>{userInfo.lastName}</td>
          <td>{birthDay}</td>
          <td>{completionDate}</td>
          <td>{bodyAge}</td>
        </tr>
      </tbody>
    </Table>
  );
};
export default QuestionResults;
