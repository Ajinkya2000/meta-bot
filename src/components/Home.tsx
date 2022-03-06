import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

  useEffect(() => {
    console.log(personName);
  }, [personName]);

  const handleChange = (e: SelectChangeEvent<typeof personName>) => {
    setPersonName(e.target?.value);
  };

  return (
    <div className="home center">
      <FormControl sx={{ m: 1, width: 300 }}>
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
      </FormControl>
    </div>
  );
};

export default Home;
