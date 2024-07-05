import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          sx={{
            padding: "8px 12px",
            borderRadius: "4px",
            backgroundColor: "#fff",
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        />
      </FormControl>
    </Box>
  );
}
