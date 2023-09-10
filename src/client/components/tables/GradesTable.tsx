import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import Link from "next/link";
import { GradesTablePageProps } from "pages/grades-table";

export default function GradesTable({ grades: _, subjectId, groupId, subject, group }: GradesTablePageProps) {
  return (
    <Box width={"90%"} marginX={"auto"} display={"flex"} flexDirection={"column"} gap={2}>
      <Box>
        <Typography variant="h3">Учёт успеваемости</Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Box flex={1}>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: "#1E90FF", fontSize: "20px" }} className={"italic"}>
            <Link className="hover:underline-offset-1 hover:text-blue-700 text-blue-500" href="subjects-list">
              {subject}
            </Link>
            <Link
              className="hover:underline-offset-1 hover:text-blue-700 text-blue-500"
              href={{ pathname: "/groups-list", query: { subject: subjectId } }}
            >
              {group}
            </Link>
            <Link
              className="hover:underline-offset-1 hover:text-blue-700 text-blue-500"
              href={{ pathname: "/attendance-table", query: { groupId: groupId, subjectId: subjectId } }}
            >
              Учёт успеваемости
            </Link>
          </Breadcrumbs>
        </Box>
        <Link href={{ pathname: "/attendance-table", query: { groupId: groupId, subjectId: subjectId } }} passHref>
          <Button variant="outlined">Открыть посещаемость</Button>
        </Link>
      </Box>
    </Box>
  );
}
