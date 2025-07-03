import { useAuth } from "@/contexts/auth/auth.context";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Greeneville Jiu Jitsu
        </Typography>
        {!user && <Button href="/login">Login</Button>}
        {user && (
          <>
            <Button href="/check-in">Check In</Button>
            <Button href="/new-member">New Member</Button>
            <Button href="/members">Members</Button>
            <Button
              href="/login"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
