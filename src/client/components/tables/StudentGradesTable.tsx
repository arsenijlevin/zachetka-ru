import { Box, Button, Typography } from "@mui/material";
import CodeCheckPopUp from "components/pop-ups/CodeCheckPopUp";
import Link from "next/link";
import { useState } from "react";

export default function StudentGradesTable() {
  const [isPopupOpen, setIsPopupOpen] = useState(0);
  const modals = [null, CodeCheckPopUp];
  const handleOpenCodeCheck = () => setIsPopupOpen(1);
  const SelectedModal = modals[isPopupOpen];

  return (
    <>
      <Box sx={{ width: "90%", margin: "0 auto" }}>
        <Box>
          <Typography variant="h3">Моя успеваемость</Typography>
        </Box>
        <Box display={"flex"} alignItems={"end"} marginY={4}>
          <Box flex={0.51} height={"100%"}>
            <Typography variant="h5">Иванов Иван Иванович</Typography>
          </Box>
          <Box flex={0.49} display={"flex"} gap={5}>
            <Button variant="outlined" style={{ width: "100%" }} onClick={handleOpenCodeCheck}>
              Код посещаемости
            </Button>
            <Link href="schedule-table" passHref style={{ flex: 1 }}>
              <Button variant="outlined" style={{ width: "100%" }}>
                Открыть расписание
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen} /> : <></>}
    </>
  );
}
