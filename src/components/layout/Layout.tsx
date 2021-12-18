import { Container } from "react-bootstrap";
import MainNavigation from "./MainNavigation";
import classes from './Layout.module.css';

const Layout: React.FC = (props) => {
  return (
    <Container  fluid>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Container>
  );
};
export default Layout;
