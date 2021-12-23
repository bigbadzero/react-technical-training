import { Form, Button } from "react-bootstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {submitUserBasicInfo} from '../../store/actions/userAction'


const UserBasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  

  
  return (
    <Fragment>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="date" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};
export default UserBasicInfo;
