import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { firestore } from "@/contexts/auth/auth.context";
import { collection, getDocs } from "firebase/firestore";
import { GreenevilleBJJObject } from "@/types/base.types";
import { BeltIcon } from "@/components/common/belt/belt.component";
import { PromoteMemberDialog } from "./members.promote.dialog.component";

export default function Members() {
  const [members, setMembers] = useState<GreenevilleBJJObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const col = collection(firestore, "members");
        const snapshot = await getDocs(col);
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as GreenevilleBJJObject[];
        setMembers(data);
      } catch (err) {
        console.error("Error loading members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [selectedMember]);

  const handlePromote = (member: GreenevilleBJJObject) => {
    setSelectedMember(member);
    setShowPromotionDialog(true);
  };

  const handleCloseDialog = () => {
    setShowPromotionDialog(false);
    setSelectedMember(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Members List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <BeltIcon
                    belt={member.rank.belt}
                    stripes={member.rank.stripes}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handlePromote(member)}
                  >
                    Promote
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedMember && (
        <PromoteMemberDialog
          open={showPromotionDialog}
          selectedMember={selectedMember}
          handleClose={handleCloseDialog}
        />
      )}
    </>
  );
}
