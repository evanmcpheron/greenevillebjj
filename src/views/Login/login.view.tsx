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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/check-in");
    }
  }, [user]);

  const handleUsernameChange = (e: GreenevilleBJJObject) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: GreenevilleBJJObject) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: GreenevilleBJJObject) => {
    e.preventDefault();
    login(email, password).then(() => {
      navigate("/check-in");
    });
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={handleUsernameChange}
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
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
