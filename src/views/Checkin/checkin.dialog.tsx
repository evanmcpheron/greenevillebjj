import { useEffect, useState } from "react";
import {
  Timestamp,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { firestore } from "@/contexts/auth/auth.context";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import { BeltIcon } from "@/components/common/belt/belt.component";
import {
  getMostRecentCheckIn,
  getCheckInsByRank,
  getCheckInsMonthToDate,
  getLastMonthCheckIns,
} from "@/services/users/users.service";
import { GreenevilleBJJUser } from "@/types/users.types";

interface CheckInDialogProps {
  open: boolean;
  handleClose: () => void;
  user: GreenevilleBJJUser;
}

export const CheckInDialog = ({
  user,
  handleClose,
  open,
}: CheckInDialogProps) => {
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [monthToDateCheckins, setMonthToDateCheckins] = useState(0);
  const [lastMonthCheckins, setLastMonthCheckins] = useState(0);
  const [checkinsByRank, setCheckinsByRank] = useState(0);

  useEffect(() => {
    const hasMemberCheckedInToday = async () => {
      try {
        const latest = await getMostRecentCheckIn(user.id);
        if (latest?.checkedAt instanceof Timestamp) {
          const tsDate = latest.checkedAt.toDate();
          const now = new Date();
          setCheckedInToday(
            tsDate.getFullYear() === now.getFullYear() &&
              tsDate.getMonth() === now.getMonth() &&
              tsDate.getDate() === now.getDate()
          );
        } else {
          setCheckedInToday(false);
        }
      } catch (err) {
        console.error("Failed to determine today's check-in:", err);
        setCheckedInToday(false);
      }
    };
    getCheckInsByRank(user.id, user.belt, user.stripes).then((res) => {
      console.log(`🚀 ~ checkin.dialog.tsx:65 ~ useEffect ~ res: \n`, res);

      setCheckinsByRank(res.length);
    });
    getCheckInsMonthToDate(user.id).then((res) => {
      setMonthToDateCheckins(res.length);
    });
    getLastMonthCheckIns(user.id).then((res) => {
      setLastMonthCheckins(res.length);
    });
    hasMemberCheckedInToday();
  }, [user]);

  const handleCheckIn = async () => {
    const checkinsCol = collection(firestore, "members", user.id, "checkins");

    await addDoc(checkinsCol, {
      checkedAt: serverTimestamp(),
      belt: user.belt,
      stripes: user.stripes,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Check In</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
          {checkedInToday && (
            <Alert severity="info" sx={{ width: "100%" }}>
              You already checked in today.
            </Alert>
          )}

          <Typography variant="h4" align="center">
            Welcome back, {user.firstName}!
          </Typography>

          <BeltIcon belt={user.belt} stripes={user.stripes} scale={3} />

          <Stack spacing={1} width="100%">
            <Typography>
              Classes at Current Rank: <strong>{checkinsByRank}</strong>
            </Typography>
            <Typography>
              Sessions This Month: <strong>{monthToDateCheckins}</strong>
            </Typography>
            <Typography>
              Sessions Last Month: <strong>{lastMonthCheckins}</strong>
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        {!checkedInToday && (
          <Button
            variant="contained"
            onClick={async () => {
              await handleCheckIn();
              handleClose();
            }}
          >
            Check In
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
