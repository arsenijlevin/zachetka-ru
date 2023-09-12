import { Box, AppBar, Button, Typography } from "@mui/material";
import Link from "next/link";
import { UserDto } from "types/User";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function Header() {
  const [user, setUser] = useState<UserDto | null>(null);
  const handleLogout = async () => {
    const cookies = new Cookies();
    cookies.set("token", "", { path: "/", maxAge: -1 });
  };

  useEffect(() => {
    const cookies = new Cookies({ path: "/" });

    if (!cookies.get("token")) return;

    const userDto = jwt_decode<UserDto>(cookies.get("token") as string);

    setUser(userDto);
  }, []);

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
          <Box className={"w-full flex flex-wrap gap-5"}>
            <Box marginRight={"auto"}>
              <Typography variant="h5" color={"black"}>
                {user?.name}
              </Typography>
            </Box>
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
