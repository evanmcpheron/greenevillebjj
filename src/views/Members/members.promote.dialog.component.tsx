import { BeltIcon } from "@/components/common/belt/belt.component";
import { GreenevilleBJJObject } from "@/types/base.types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { beltChoices } from "../NewMember/new.members.view";
import { useEffect, useState } from "react";
import { BeltColor } from "@/components/common/belt/belt.component.styled";
import { updateDocById } from "@/services/api.service";
import { firestore } from "@/contexts/auth/auth.context";
import { doc, getDoc } from "firebase/firestore";

export async function getMemberById(
  memberId: string
): Promise<{ id: string; [key: string]: any } | null> {
  const memberRef = doc(firestore, "members", memberId);

  try {
    // 2. Retrieve the document
    const snap = await getDoc(memberRef);
    if (!snap.exists()) {
      console.warn(`No member found with ID ${memberId}`);
      return null;
    }

    // 3. Return an object with the ID and data
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error("Error fetching member:", err);
    throw err;
  }
}

export const PromoteMemberDialog = ({
  open,
  selectedMember,
  handleClose,
}: GreenevilleBJJObject) => {
  const [belt, setBelt] = useState("white");
  const [stripes, setStripes] = useState(0);

  const reset = () => {
    setBelt("white");
    setStripes(0);
  };

  useEffect(() => {
    setBelt(selectedMember?.rank.belt);
    setStripes(selectedMember?.rank.stripes);
  }, [selectedMember]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Promote {selectedMember.firstName}!</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="belt-rank">Belt</InputLabel>
          <Select
            labelId="belt-rank"
            id="belt-rank"
            value={belt}
            label="Belt"
            onChange={(e) => setBelt(e.target.value)}
          >
            {beltChoices}
          </Select>
          {belt !== "red" && belt !== "red_white" && belt !== "red_black" && (
            <>
              <FormLabel id="stripes">Stripes</FormLabel>
              <RadioGroup
                aria-labelledby="stripes"
                defaultValue={stripes}
                name="stripes"
                row
                onChange={(e) => setStripes(parseInt(e.target.value))}
              >
                {Array.from(
                  { length: belt === "black" ? 7 : 5 },
                  (_value, index) => (
                    <FormControlLabel
                      key={index}
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
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {selectedMember && (
            <div>
              <Typography>Current Belt</Typography>
              <BeltIcon
                belt={selectedMember?.rank.belt as BeltColor}
                stripes={selectedMember?.rank.stripes}
                scale={3}
              />
            </div>
          )}
          <div>
            <Typography>New Belt</Typography>

            <BeltIcon belt={belt as BeltColor} stripes={stripes} scale={3} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            reset();
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (
              belt === selectedMember.rank.belt &&
              stripes === selectedMember.rank.stripes
            ) {
              reset();
              handleClose();
              return;
            }
            reset();
            updateDocById("members", selectedMember.id, {
              rank: { belt, stripes },
            });
            handleClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
