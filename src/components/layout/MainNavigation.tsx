import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import { RootState } from "../../store/index";
import { UserState } from "../../reducers/userReducer";
import { Fragment } from "react";

const MainNavigation = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const isLoggedIn = userLogin.isLoggedIn;

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React Technical Training</Navbar.Brand>
        {isLoggedIn ? (
          <Fragment>
            <Nav className="me-auto">
              <Nav.Link href="">Home</Nav.Link>
              <Nav.Link href="">Features</Nav.Link>
              <Nav.Link href="">Pricing</Nav.Link>
            </Nav>
            <Nav className="mr-right">
              <Nav.Link href="">Logout</Nav.Link>
            </Nav>
          </Fragment>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
