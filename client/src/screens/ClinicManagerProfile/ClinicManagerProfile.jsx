import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import ImageInput from "../../components/Generals/ImageInput";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../components/ClinicManagerUsers/clinicManagerUsersSlice";

const ClinicManagerProfile = ({ comingFrom }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [id, setID] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [originalID, setOriginalID] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(
    (state) => state.clinicManagerUsers
  );
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (comingFrom === "profile" && currentUser) {
      setFirstName(
        currentUser?.user?.user?.firstName || currentUser?.firstName
      );
      setLastName(currentUser?.user?.user?.lastName || currentUser?.lastName);
      setProfileImage(currentUser?.user?.user?.avatar || currentUser?.avatar);
      setID(currentUser?.userId);
      setOriginalID(currentUser?.userId);
    }
  }, [comingFrom, currentUser]);

  const handleUpdate = () => {
    const data = {
      firstName,
      lastName,
      id,
      profileImage,
      originalID,
    };
    dispatch(updateProfile(data)).then(() => {
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isReadOnly = comingFrom === "profile";

  return (
    <Box
      sx={{
        m: 4,
        p: 4,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        PROFILE
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="First Name"
            variant="standard"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Last Name"
            variant="standard"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isReadOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="ID"
            disabled={isReadOnly}
            value={id}
            onChange={(e) => setID(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box alignItems="center">
            {comingFrom !== "profile" ? (
              <ImageInput
                profileImage={profileImage}
                setProfileImage={setProfileImage}
              />
            ) : (
              <Avatar
                alt="User Profile"
                src={profileImage}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            )}
          </Box>
        </Grid>
        {comingFrom === "edit-profile" && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
      {isError && (
        <Snackbar open autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ClinicManagerProfile;
