import React, { useState } from "react";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

// Image
import plusIcon from "../images/plus-solid.svg";

interface Props {
  goalList: string[];
  setGoalList: React.Dispatch<React.SetStateAction<string[]>>;
}

const GoalList: React.FC<Props> = ({ goalList, setGoalList }) => {
  const [value, setValue] = useState<string>("");

  const handleAddGoal = () => {
    if (!value) return;
    setGoalList([...goalList, value]);
    setValue("");
  };

  return (
    <div>
      <div className="add-goal-form center">
        <Form.Label>Enter your goal</Form.Label>
        <Form.Group className="mb-3 d-flex" controlId="formBasicGoalList">
          <Form.Control
            type="text"
            placeholder="Add a Goal"
            className="capitalize"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="ms-2 add-icon" onClick={handleAddGoal}>
            <img src={plusIcon} alt="add-icon" />
          </Button>
        </Form.Group>
      </div>
      {goalList.map((goal, index) => (
        <Badge pill bg="dark" key={index} className="m-1 px-3 py-2">
          {goal}
        </Badge>
      ))}
    </div>
  );
};

export default GoalList;
