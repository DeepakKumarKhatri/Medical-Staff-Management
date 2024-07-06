import { Container } from "@mui/material";
import React from "react";
import PatientGrid from '../../components/PatientCard/PatientCard';

const DoctorPatients = () => {

  const patients = [
    {
      firstName: 'John',
      lastName: 'Doe',
      profileImage: 'https://avatars.githubusercontent.com/u/86526696?v=4',
      id: 'john_doe_123456',
      password: 'johndoe123!',
      status: 'active',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      profileImage: 'https://avatars.githubusercontent.com/u/86526696?v=4',
      id: 'jane_doe_654321',
      password: 'janedoe123!',
      status: 'inactive',
    },
    
    // Add more patient objects as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PatientGrid patients={patients} />
    </Container>
  );
};

export default DoctorPatients;
