import { useState, useEffect, Fragment } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import IUserData from "../../models/IUserData";
import TableData from "./TableData";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllResults = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUserData[]>([]);
  const [recentUsers, setRecentUsers] = useState<IUserData[]>([]);
  const [olderUsers, setOlderUsers] = useState<IUserData[]>([]);
  const [showRecentUsers, setShowRecentUsers] = useState<boolean>(true);

  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : null;

  const filterUsers = (users: IUserData[]) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);

    const mostRecentUsers = users.filter(
      (user) => (new Date (user.completionDate as Date).getTime()) >= currentDate.getTime()
    );
    setRecentUsers(mostRecentUsers);

    const oldestUsers = users.filter(
        (user) => (new Date (user.completionDate as Date).getTime()) < currentDate.getTime()
    )
    setOlderUsers(oldestUsers);
  };
  useEffect(() => {
    const getResponse = async () => {
        const response = await fetch("https://localhost:44372/api/Account/GetUsers")
          .then((response) => response.json())
          .then((data) => {
            let retrievedUsers = data as IUserData[];
            setUsers(retrievedUsers);
            filterUsers(retrievedUsers);
          });
      };
    if (!token) {
      navigate("/login");
    } else {
      getResponse();
    }
  }, [token, navigate,]);

  return (
    <Fragment>
      <Row>
        <Col>
          <Button onClick={():void => setShowRecentUsers(true)} variant="primary">Recent Results</Button>
          <Button onClick={():void => setShowRecentUsers(false)} variant="secondary">Older Results</Button>
        </Col>
      </Row>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthday</th>
            <th>Completion Date</th>
            <th>Bodyh Age</th>
          </tr>
        </thead>
        <tbody>
          {!showRecentUsers && olderUsers.map((user) => (
            <TableData user={user} />
          ))}
          {showRecentUsers && recentUsers.map((user) => (
            <TableData user={user} />
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};
export default AllResults;
