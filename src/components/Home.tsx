import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Material UI
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

// Add a select for first time and then store it in local storage.

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Ajinkya", "Sushant", "Kashish", "Garvita"];

const Home = () => {
  const [personName, setPersonName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedPersonName = localStorage.getItem("personName");
    if (savedPersonName) {
      navigate("/add-goal", { replace: true, state: savedPersonName });
    }
  }, [navigate]);

  const handleChange = (e: SelectChangeEvent<typeof personName>) => {
    setHasError(false);
    setPersonName(e.target?.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!personName) {
      setHasError(true);
      return;
    }

    localStorage.setItem("personName", personName);
    navigate("/add-goal", { replace: true, state: personName });
  };

  return (
    <div className="home center">
      <form className="center name-form" onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, width: 300 }} error={hasError}>
          <InputLabel id="select-name">Who are you?</InputLabel>
          <Select
            labelId="select-name"
            id="select"
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Who are you?" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          {hasError && <FormHelperText>Please select a name.</FormHelperText>}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ my: 2, width: 150 }}
        >
          Add Goal
        </Button>
      </form>
    </div>
  );
};

export default Home;
