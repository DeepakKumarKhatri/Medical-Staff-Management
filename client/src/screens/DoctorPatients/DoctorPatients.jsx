import { Container } from "@mui/material";
import React from "react";
import PatientGrid from "../../components/PatientCard/PatientCard";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Search } from "lucide-react";

const DoctorPatients = () => {
  const patients = [
    {
      firstName: "John",
      lastName: "Doe",
      profileImage: "https://avatars.githubusercontent.com/u/86526696?v=4",
      id: "john_doe_123456",
      password: "johndoe123!",
      status: "active",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      profileImage: "https://avatars.githubusercontent.com/u/86526696?v=4",
      id: "jane_doe_654321",
      password: "janedoe123!",
      status: "inactive",
    },

    // Add more patient objects as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <h1 className="text-3xl font-bold text-blue-900">
              Dr. Deepak's Patients
            </h1>
            <p className="text-gray-600">
              Following are all the patients that you have checked within
              Medico.
            </p>
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "4px",
              backgroundColor: "#fff",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="input-with-icon-adornment">
                Search
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      <PatientGrid patients={patients} />
    </Container>
  );
};

export default DoctorPatients;
