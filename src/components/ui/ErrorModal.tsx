import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { userLoginFailAcknowled } from "../../store/actions/userAction";
import ReactDom from 'react-dom';

const ErrorModal: React.FC<{container:HTMLElement | null}> = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );
  const error = userLogin.error;

  const acknowledgeErrorHandler = () =>{
      dispatch(userLoginFailAcknowled());
      handleClose();
  }

  useEffect(() =>{
      if(error){
        handleShow();  
      }
      else{
          handleClose();
      }
  },[error])

  if(!show){
    return null;
  }

  return ReactDom.createPortal(
    <Modal
      show={show}
      onHide={acknowledgeErrorHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={acknowledgeErrorHandler} variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>, props.container ?? document.getElementById("errorModal-root") as HTMLElement
  );
};

export default ErrorModal;
