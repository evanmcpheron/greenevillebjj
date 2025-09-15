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
import { GreenevilleBJJUser } from "@/types/users.types";
import { getUserByPhoneNumber } from "@/services/users/users.service";

const CheckIn: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [existingUser, setExistingUser] = useState<GreenevilleBJJUser | null>(
    null
  );
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
    getUserByPhoneNumber(phone).then((response) => {
      if (response) {
        setExistingUser(response[0]);
        setDialogOpen(true);
      } else {
        setExistingUser(null);
        console.log("TODO: error notification here");
      }
    });
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
        {existingUser && (
          <CheckInDialog
            user={existingUser}
            handleClose={handleClose}
            open={dialogOpen}
          />
        )}
      </Paper>
    </Container>
  );
};

export default CheckIn;
