import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import IUserData from "../../models/IUserData";
import TableData from "./TableData";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllResults = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUserData[]>([]);

  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : null;

  const getResponse = async () => {
    const response = await fetch("https://localhost:44372/api/Account/GetUsers")
      .then((response) => response.json())
      .then((data) => {
        let test = data as IUserData[];
        console.log(test);
        setUsers(test);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else{
        getResponse();
    }
    
  }, [token, navigate]);

  return (
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
        {users.map((user) => (
          <TableData user={user} />
        ))}
      </tbody>
    </Table>
  );
};
export default AllResults;
