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
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { BeltIcon } from "@/components/common/belt/belt.component";
import { PromoteMemberDialog } from "./members.promote.dialog.component";
import { useMembers } from "@/hooks/members.hooks";
import { GreenevilleBJJUser } from "@/types/users.types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteMemberById } from "@/services/users/users.service";

export default function Members() {
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const deleteMemberByIdRef = useRef("");
  const [selectedMember, setSelectedMember] =
    useState<GreenevilleBJJUser | null>(null);

  const { fetchMembers, allMembers, isLoading } = useMembers();

  useEffect(() => {
    fetchMembers();
  }, [selectedMember]);

  const handlePromote = (member: GreenevilleBJJUser) => {
    setSelectedMember(member);
    setShowPromotionDialog(true);
  };

  const handleCloseDialog = () => {
    setShowPromotionDialog(false);
    setSelectedMember(null);
  };

  if (isLoading) {
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Rank</TableCell>
              <TableCell align="left">Actions</TableCell>

              <TableCell align="right">
                <DeleteIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMembers.map((member: GreenevilleBJJUser) => {
              return (
                <TableRow key={member.id}>
                  <TableCell align="left">
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell align="left">{member.email}</TableCell>
                  <TableCell align="left">{member.phone}</TableCell>
                  <TableCell align="left">
                    <BeltIcon belt={member.belt} stripes={member.stripes} />
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePromote(member);
                      }}
                    >
                      Promote
                    </Button>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMemberByIdRef.current = member.id;
                        setShowDeleteConfirmation(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={showDeleteConfirmation}>
        <DialogContent>
          Are you sure you want to delete this user? This cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirmation(false)}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => {
              deleteMemberById(deleteMemberByIdRef.current)
                .then(() => {
                  fetchMembers();
                })
                .finally(() => {
                  deleteMemberByIdRef.current = "";
                  setShowDeleteConfirmation(false);
                });
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
