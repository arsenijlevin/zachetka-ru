import { Box, AppBar, Button } from "@mui/material";
import Link from "next/link";
import Cookies from "universal-cookie";

function Header() {
  const handleLogout = async () => {
    const cookies = new Cookies();
    cookies.set("token", "", { path: "/", maxAge: -1 });
  };

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: "white", minHeight: "50px", paddingY: "20px" }}>
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ display: "flex", gap: 5 }}>
            <Link href="password-change" passHref>
              <Button variant="contained" style={{ width: "250px", backgroundColor: "rgb(30, 144, 255)" }}>
                Сменить пароль
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button
                variant="contained"
                style={{ width: "250px", backgroundColor: "rgb(30, 144, 255)" }}
                onClick={handleLogout}
              >
                Выход
              </Button>
            </Link>
          </Box>
        </Box>
      </AppBar>
      <br />
    </Box>
  );
}

export default Header;
