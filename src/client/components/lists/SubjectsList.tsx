import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { SubjectForProfessor } from "types/SubjectForProfessor";

interface SubjectsListProps {
  subjects: SubjectForProfessor[];
}

function SubjectsList({ subjects }: SubjectsListProps) {
  return (
    <Box width={"90%"} marginX={"auto"} display={"flex"} flexDirection={"column"} gap={2}>
      <Box>
        <Typography variant="h3">Выберите дисциплину</Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        {subjects.map((item, index) => (
          <Link
            href={{ pathname: "/groups-list", query: { subject: item.id } }}
            passHref
            style={{ color: "#1E90FF", fontSize: "20px" }}
            key={index}
          >
            {item.title}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default SubjectsList;
