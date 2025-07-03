import { useEffect, useState } from "react";
import {
  Timestamp,
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/contexts/auth/auth.context";
import { GreenevilleBJJObject } from "@/types/base.types";
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

async function getCheckInsMonthToDate(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const checkinsCol = collection(firestore, "members", userId, "checkins");
  const q = query(
    checkinsCol,
    where("checkedAt", ">=", startOfMonth),
    where("checkedAt", "<=", now),
    orderBy("checkedAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getLastMonthCheckIns(userId: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const lastMonth = month === 0 ? 11 : month - 1;
  const lastMonthYear = month === 0 ? year - 1 : year;

  const start = new Date(lastMonthYear, lastMonth, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);

  const checkinsCol = collection(firestore, "members", userId, "checkins");
  const q = query(
    checkinsCol,
    where("checkedAt", ">=", start),
    where("checkedAt", "<=", end),
    orderBy("checkedAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

const getMostRecentCheckIn = async (userId: string): Promise<any> => {
  const checkinsCol = collection(firestore, "members", userId, "checkins");

  const q = query(checkinsCol, orderBy("checkedAt", "desc"), limit(1));

  const snap = await getDocs(q);

  if (snap.empty) {
    console.log("No check-ins found for member", userId);
    return null;
  }

  const doc = snap.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  };
};

async function getCheckInsByRank(
  userId: string,
  belt: string,
  stripes: number
) {
  const checkinsCol = collection(firestore, "members", userId, "checkins");
  const q = query(
    checkinsCol,
    where("belt", "==", belt),
    where("stripes", "==", stripes)
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export const CheckInDialog = ({
  user,
  handleClose,
  dialogOpen,
}: GreenevilleBJJObject) => {
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
    getCheckInsByRank(user.id, user.rank.belt, user.rank.stripes).then(
      (res) => {
        console.log(`🚀 ~ checkin.dialog.tsx:138 ~ useEffect ~ res: \n`, res);

        setCheckinsByRank(res.length);
      }
    );
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
      belt: user.rank.belt,
      stripes: user.rank.stripes,
    });
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
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

          <BeltIcon
            belt={user.rank.belt}
            stripes={user.rank.stripes}
            scale={3}
          />

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
