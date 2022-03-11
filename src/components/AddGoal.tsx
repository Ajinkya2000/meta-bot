import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// React Bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

// Type
import { nameOptionType } from "../types/name-option-type";

const AddGoal = () => {
  const [name, setName] = useState<nameOptionType>(null);
  const [toastDetails, setToastDetails] = useState({
    visible: false,
    type: "info",
    msg: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { savedName: nameOptionType }; // This line tackles the `unknown` type of state in location object

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }

    setName(state.savedName);
  }, [navigate, state]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/postMessageToDiscord", {
        data: "data",
      });

      if (res.status === 201) {
        const msg = res.data.msg;
        const type = res.data.type;
        setToastDetails({ ...toastDetails, visible: true, msg, type });
      }
    } catch (err: any) {
      const msg = err.response.data.msg;
      const type = err.response.data.type;
      setToastDetails({ ...toastDetails, visible: true, msg, type });
    }
  };

  const handleToastClose = () => {
    setToastDetails({ visible: false, type: "info", msg: "" });
  };

  return (
    <>
      <Container className="add-goal center">
        <Card className="add-goal-card">
          <Form className="p-5" onSubmit={sendMessage}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
        {toastDetails.visible && (
          <ToastContainer position="bottom-end" className="m-4">
            <Toast
              onClose={handleToastClose}
              show={true}
              delay={5000}
              bg={toastDetails.type}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Status</strong>
              </Toast.Header>
              <Toast.Body className="text-white">{toastDetails.msg}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </Container>
    </>
  );
};

export default AddGoal;
