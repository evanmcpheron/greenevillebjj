import { useAuth } from "@/contexts/auth/auth.context";
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

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useAuth();

  const handleNameChange = (e: GreenevilleBJJObject) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: GreenevilleBJJObject) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: GreenevilleBJJObject) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: GreenevilleBJJObject) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: GreenevilleBJJObject) => {
    e.preventDefault();

    register(email, password, { name });
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
