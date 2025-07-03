import { BJJ_BELT_HEX } from "@/components/common/belt/all.belts.component";
import { BeltIcon } from "@/components/common/belt/belt.component";
import { BeltColor } from "@/components/common/belt/belt.component.styled";
import { postDoc } from "@/services/api.service";
import { GreenevilleBJJObject } from "@/types/base.types";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const beltChoices = BJJ_BELT_HEX.map((belt) => (
  <MenuItem value={belt}>
    <BeltIcon belt={belt} />
  </MenuItem>
));

const NewMembersView: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  // Handlers for each field
  const handleFirstNameChange = (e: GreenevilleBJJObject) =>
    setFirstName(e.target.value);
  const handleLastNameChange = (e: GreenevilleBJJObject) =>
    setLastName(e.target.value);
  const handleEmailChange = (e: GreenevilleBJJObject) =>
    setEmail(e.target.value);
  const handlePhoneChange = (e: GreenevilleBJJObject) =>
    setPhone(e.target.value);
  const handleBirthdayChange = (e: GreenevilleBJJObject) =>
    setBirthday(e.target.value);

  const handleSubmit = async (e: GreenevilleBJJObject) => {
    e.preventDefault();

    await postDoc("members", {
      firstName,
      lastName,
      email,
      phone,
      birthday,
      rank: formData.rank,
      checkins: [],
    });

    navigate("/members");
  };
  const [formData, setFormData] = useState({
    rank: { belt: "white" as BeltColor, stripes: 0 },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      rank: {
        belt: event.target.value as BeltColor,
        stripes: prev.rank.stripes,
      },
    }));
  };

  const handleUpdateBelt = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      rank: {
        belt: prev.rank.belt,
        stripes: parseInt(event.target.value),
      },
    }));
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create New Member
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={lastName}
            onChange={handleLastNameChange}
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
            label="Phone Number"
            type="tel"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={phone}
            onChange={handlePhoneChange}
          />
          <TextField
            label="Birthday"
            type="date"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={birthday}
            onChange={handleBirthdayChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Typography>Rank</Typography>
        <FormControl fullWidth>
          <InputLabel id="belt-rank">Belt</InputLabel>
          <Select
            labelId="belt-rank"
            id="belt-rank"
            value={formData.rank.belt}
            label="Belt"
            onChange={handleChange}
          >
            {beltChoices}
          </Select>
          {formData.rank.belt !== "red" &&
            formData.rank.belt !== "red_white" &&
            formData.rank.belt !== "red_black" && (
              <>
                <FormLabel id="stripes">Stripes</FormLabel>
                <RadioGroup
                  aria-labelledby="stripes"
                  defaultValue={0}
                  name="stripes"
                  row
                  onChange={handleUpdateBelt}
                >
                  {Array.from(
                    { length: formData.rank.belt === "black" ? 7 : 5 },
                    (_value, index) => (
                      <FormControlLabel
                        value={index}
                        control={<Radio />}
                        label={index}
                      />
                    )
                  )}
                </RadioGroup>
              </>
            )}
        </FormControl>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <BeltIcon
            belt={formData.rank.belt}
            stripes={formData.rank.stripes}
            scale={5}
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create Member
        </Button>
      </Paper>
    </Container>
  );
};

export default NewMembersView;
