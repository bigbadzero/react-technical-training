import { Button, Card } from "react-bootstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector } from "react-redux";

const Question3: React.FC<{
  submitAnswer: (
    question: number,
    answer: number,
    userState: UserState
  ) => () => void;
}> = (props) => {
  const question: number = 3;
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );

  return (
    <Card>
      <Card.Title>Can you touch your toes?</Card.Title>
      <Card.Body>
        <Button
          onClick={props.submitAnswer(question, 1, userLogin)}
          variant="danger"
        >
          No
        </Button>
        <Button
          onClick={props.submitAnswer(question, -1, userLogin)}
          variant="success"
        >
          Yes
        </Button>
      </Card.Body>
    </Card>
  );
};
export default Question3;
