import { readDocBy } from "@/services/api.service";
import { GreenevilleBJJObject } from "@/types/base.types";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { CheckInDialog } from "./checkin.dialog";

const CheckIn: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [existingUser, setExistingUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setPhone("");
    setDialogOpen(false);
  };

  const handlePhoneChange = (e: GreenevilleBJJObject) => {
    setPhone(e.target.value);
  };

  const handleLookup = async (e: GreenevilleBJJObject) => {
    e.preventDefault();
    const response = await readDocBy("members", "phone", phone);

    if (response) {
      setExistingUser(response[0]);
      setDialogOpen(true);
      setUserExists(true);
    } else {
      setUserExists(false);
      setExistingUser(null);
      console.log("TODO: error notification here");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Check In
        </Typography>
        <Box component="form" onSubmit={handleLookup} noValidate>
          <TextField
            label="Phone Number"
            type="tel"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={phone}
            onChange={handlePhoneChange}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Lookup
          </Button>
        </Box>
        {userExists && (
          <CheckInDialog
            user={existingUser}
            handleClose={handleClose}
            dialogOpen={dialogOpen}
          />
        )}
      </Paper>
    </Container>
  );
};

export default CheckIn;
