import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import clsx from "clsx";
import { getStatusClass } from "../../constants/getStatusClass";

export default function StatusDropdown() {
  const [status, setStatus] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (event) => {
    setStatus(event.target.value);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
          className={clsx("rounded-2xl", getStatusClass(status))}
        >
          <MenuItem value="Start Treatment" className="bg-red-100 text-red-700">
            Start Treatment
          </MenuItem>
          <MenuItem value="Mid Treatment" className="bg-blue-100 text-blue-700">
            Mid Treatment
          </MenuItem>
          <MenuItem
            value="End Treatment"
            className="bg-green-100 text-green-700"
          >
            End Treatment
          </MenuItem>
        </Select>
      </FormControl>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Status changed to {status}
        </Alert>
      </Snackbar>
    </Box>
  );
}
