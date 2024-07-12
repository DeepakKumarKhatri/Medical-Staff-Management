import { Container } from "@mui/material";
import React from "react";
import PatientGrid from "../../components/Cards/PatientCard";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {getPatients} from '../../screens/DoctorPatients/doctorSlice';
import { useEffect } from "react";

const DoctorPatients = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const doctorId = currentUser?.id;

  useEffect(() => {
    if (doctorId) {
      dispatch(getPatients(doctorId));
    }
  }, [doctorId, dispatch]);

  const patients = useSelector((state) => state.doctor.patients);
  console.log(patients);
  const isLoading = useSelector((state) => state.doctor.isLoading);
  const isError = useSelector((state) => state.doctor.isError);
  const errorMessage = useSelector((state) => state.doctor.errorMessage);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <h1 className="text-3xl font-bold text-blue-900">
            Dr. Deepak's Patients
          </h1>
          <p className="text-gray-600">
            Following are all the patients that you have checked within Medico.
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
            <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
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
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{errorMessage}</p>
      ) : (
        <PatientGrid patients={patients} />
      )}
    </Container>
  );
};

export default DoctorPatients;

