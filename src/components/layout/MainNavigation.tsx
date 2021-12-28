import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { Fragment } from "react";
import {logout} from '../../store/actions/userAction';
import {NavLink} from 'react-router-dom';
import classes from './Layout.module.css';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const { userInfo } = userLogin;
  const token = userInfo ? userInfo.token : null;

  const logoutHandler = () =>{
    dispatch(logout());
  }

  return (
    <Navbar bg="dark" variant="dark">
       <Navbar.Brand>
       <img  src={process.env.PUBLIC_URL + '/CGITransparent.png'} height="20" alt="" />
       </Navbar.Brand>
      <Container>
        <Navbar.Brand className="mr-left">
        
          React Technical Training</Navbar.Brand>
        {token ? (
          <Fragment>
            <Nav className="me-auto">
              <Nav.Link>
                <NavLink className={(navData) => navData.isActive ? classes.navitemactive : classes.navitem} to="/">Quiz</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink className={(navData) => navData.isActive ? classes.navitemactive : classes.navitem} to="/results">All Results</NavLink>
              </Nav.Link>
            </Nav>
            <Nav className="mr-right">
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </Nav>
          </Fragment>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
