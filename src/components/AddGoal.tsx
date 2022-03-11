import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// React Bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Type
import { nameOptionType } from "../types/name-option-type";

const AddGoal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { savedName: nameOptionType }; // This line tackles the `unknown` type of state in location object

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [navigate, state]);

  return (
    <Container className="add-goal center">
      <Card className="add-goal-card">
        <Form className="p-5">
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
    </Container>
  );
};

export default AddGoal;
