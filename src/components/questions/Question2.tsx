import { Button, Card } from "react-bootstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector } from "react-redux";
;


const Question2: React.FC<{
  submitAnswer: (
    question: number,
    answer: number,
    userState: UserState
  ) => () => void;
}> = (props) => {
  const question: number = 2;
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );

  return (
    <Card>
      <Card.Title>Do you eat junk food?</Card.Title>
      <Card.Body>
        <Button
          onClick={props.submitAnswer(question, 1, userLogin)}
          variant="danger"
        >
          Never
        </Button>
        <Button
          onClick={props.submitAnswer(question, 0, userLogin)}
          variant="warning"
        >
          Sometimes
        </Button>
        <Button
          onClick={props.submitAnswer(question, -1, userLogin)}
          variant="success"
        >
          Always
        </Button>
      </Card.Body>
    </Card>
  );
};
export default Question2;
