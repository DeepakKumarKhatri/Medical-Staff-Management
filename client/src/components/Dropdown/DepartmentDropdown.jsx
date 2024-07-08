import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DepartmentDropdown({ comingFrom }) {
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
          labelId="department-select-label"
          id="department-select"
          value={department}
          label="Department"
          onChange={handleChange}
          disabled={comingFrom === "profile"}
        >
          <MenuItem value="Cardiology">Cardiology</MenuItem>
          <MenuItem value="Neurology">Neurology</MenuItem>
          <MenuItem value="Orthopedics">Orthopedics</MenuItem>
          <MenuItem value="Pediatrics">Pediatrics</MenuItem>
          <MenuItem value="General Medicine">General Medicine</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
