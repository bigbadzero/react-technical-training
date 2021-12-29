import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { RootState } from "../../store/index";
import { UserState } from "../../store/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { registrationAcknowled } from "../../store/actions/userAction";
import ReactDom from 'react-dom';

const RegistrationCompleteModal = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userLogin = useSelector<RootState, UserState>(
      (state) => state.userLogin
    );
    const registered = userLogin.registered;
  
    const acknowledgeErrorHandler = () =>{
        dispatch(registrationAcknowled());
        handleClose();
    }
  
    useEffect(() =>{
        if(registered){
          handleShow();  
        }
        else{
            handleClose();
        }
    },[registered])
  
  
    return ReactDom.createPortal(
      <Modal
        show={show}
        onHide={acknowledgeErrorHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration Complete!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {"Registration complete! Log in with your new credentials"}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={acknowledgeErrorHandler} variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>, document.getElementById("errorModal-root") as HTMLElement
    );
}
export default RegistrationCompleteModal;