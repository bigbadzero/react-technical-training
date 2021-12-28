import { Table } from "react-bootstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector } from "react-redux";
import IUserData from "../../models/IUserData";
import TableData from './TableData'

const UserResults = () => {
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
  }
  

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
        <TableData user={user} />
      </tbody>
    </Table>
  );
};
export default UserResults;
