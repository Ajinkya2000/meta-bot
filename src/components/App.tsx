import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

// Components
import Home from "./Home";
import AddGoal from "./AddGoal";

// CSS
import "./App.css";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-goal" element={<AddGoal />} />
      </Routes>
    </Container>
  );
};

export default App;
