import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import IUserData from "../../models/IUserData";
import TableData from "./TableData";

const AllResults = () => {
  const [users, setUsers] = useState<IUserData[]>([]);

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
    getResponse();
  }, []);

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
          <TableData user={user}/>
        ))}
      </tbody>
    </Table>
  );
};
export default AllResults;
