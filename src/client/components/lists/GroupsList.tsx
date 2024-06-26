import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import AttendanceCheckPopUp from "../pop-ups/AttendanceCheckPopUp";
import Link from "next/link";
import React from "react";
import { GroupsForProfessor } from "types/GroupsForProfessor";

interface GroupsListProps {
  subject: {
    semester: number;
    title: string;
    id: number;
  };
  groups: GroupsForProfessor[];
  subjectId: number;
}

function GroupsList({ subject, groups, subjectId }: GroupsListProps) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(0);
  const modals = [null, AttendanceCheckPopUp];
  const handleOpenAttendanceCheck = () => setIsPopupOpen(1);
  const SelectedModal = modals[isPopupOpen];

  return (
    <>
      <Box width={"90%"} marginX={"auto"} display={"flex"} flexDirection={"column"} gap={2}>
        <Box>
          <Typography variant="h3">Выберите группу</Typography>
        </Box>
        <Box display={"flex"}>
          <Box flex={1}>
            <Breadcrumbs aria-label="breadcrumb" className={"italic"}>
              <Link
                className="hover:underline-offset-1 hover:text-blue-700 text-blue-500"
                style={{ color: "#1E90FF", fontSize: "20px" }}
                href="subjects-list"
              >
                {subject.title}
              </Link>
            </Breadcrumbs>
          </Box>
          <Box>
            <Button variant="outlined" onClick={handleOpenAttendanceCheck}>
              Проверка посещаемости
            </Button>
          </Box>
        </Box>
        <Box>
          <Box display={"flex"} flexDirection={"column"} gap={4}>
            {groups.map((item, index) => (
              <Link
                key={index}
                href={{ pathname: "/attendance-table", query: { groupId: item.id, subjectId: subjectId } }}
                passHref
                style={{ color: "#1E90FF", fontSize: "20px" }}
              >
                {item.title}
              </Link>
            ))}
          </Box>
        </Box>
        {SelectedModal ? (
          <SelectedModal groups={groups} subject={subject} open={true} setOpen={setIsPopupOpen} />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default GroupsList;
