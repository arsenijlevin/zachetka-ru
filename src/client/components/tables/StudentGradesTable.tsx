import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Select, Typography } from "@mui/material";
import CodeCheckPopUp from "components/pop-ups/CodeCheckPopUp";
import { getFinalMarkForPoints } from "components/tables/GradesTable";
import Link from "next/link";
import { StudentPerformanceTableData } from "pages/student-grades-table";
import { useState } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

export default function StudentGradesTable({ performance }: { performance: StudentPerformanceTableData[] }) {
  const [isPopupOpen, setIsPopupOpen] = useState(0);
  const modals = [null, CodeCheckPopUp];
  const handleOpenCodeCheck = () => setIsPopupOpen(1);
  const SelectedModal = modals[isPopupOpen];

  const columns = [
    {
      key: "semester",
      name: "Семестр",
      width: "max-content",
    },
    {
      key: "course",
      name: "Курс",
      width: "max-content",
    },
    {
      key: "subject",
      name: "Предмет",
    },
    {
      key: "reporting_type",
      name: "Отчётность",
      width: "max-content",
    },
    {
      key: "professors",
      name: "Преподаватели",
      renderCell({ row }: { row: { professors: string[] } }) {
        if (row.professors.length > 1) {
          return (
            <Select
              sx={{
                touchAction: "none",
                padding: 0,
                width: "100%",
                margin: 0,
                boxShadow: "none",
                fontFamily: "inherit",
                fontSize: "inherit",

                "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                  border: 0,
                },
                fieldset: {
                  border: "0  !important",
                  outline: "none !important",
                },
              }}
              value={row.professors[0]}
            >
              {row.professors.map((professor, index) => {
                return (
                  <MenuItem onClick={undefined} value={professor} key={index}>
                    {professor}
                  </MenuItem>
                );
              })}
            </Select>
          );
        } else {
          return <>{row.professors}</>;
        }
      },
    },
    {
      key: "point1",
      name: "КТ1",
      width: "max-content",
    },
    {
      key: "point2",
      name: "КТ2",
      width: "max-content",
    },
    {
      key: "point3",
      name: "КТ3",
      width: "max-content",
    },
    {
      key: "point_avg",
      name: "КТ Сред.",
      width: "max-content",
    },
    {
      key: "exam_mark",
      name: "Экзамен",
      width: "max-content",
    },
    {
      key: "total_points",
      name: "Итоговый балл",
      width: "max-content",
    },
    {
      key: "final_mark",
      name: "Итог",
      width: "max-content",
    },
  ];

  const rows = performance.map((rowPerf) => {
    const semester = rowPerf.semester;
    const course = semester / 2;
    const subject = rowPerf.title;
    const reporting_type = rowPerf.reporting_type;
    const subjectPerf = rowPerf.student_performance[0];

    const professors: string[] = rowPerf.professor_subject.map((professor) => {
      const splitProfessorName = professor.users.name.split(" ");
      return splitProfessorName.length > 1
        ? `${splitProfessorName[0]} ${splitProfessorName[1].charAt(0)}. ${splitProfessorName[2].charAt(0)}.`
        : "";
    });

    const point1 = subjectPerf?.point1 ?? "";
    const point2 = subjectPerf?.point2 ?? "";
    const point3 = subjectPerf?.point3 ?? "";
    const exam_mark = subjectPerf?.exam_mark ?? "";

    let point_avg = "";
    let total_points = "";
    let final_mark = "";

    if (Number.isSafeInteger(point1 + point2 + point3)) {
      point_avg = (Math.round(point1 + point2 + point3) / 3).toString();
      point_avg = Math.round(parseInt(point_avg)).toString();

      if (exam_mark) {
        const totalPoints = (parseInt(point_avg) + exam_mark) / 2;
        total_points = Math.round(totalPoints).toString();
      }
    }

    if (Number.isSafeInteger(parseInt(total_points))) {
      final_mark = getFinalMarkForPoints(parseInt(total_points));
    }

    return {
      semester,
      course,
      subject,
      reporting_type,
      professors,
      point1,
      point2,
      point3,
      exam_mark,
      final_mark,
      total_points,
      point_avg,
    };
  });

  return (
    <>
      <Box sx={{ width: "90%", margin: "0 auto" }}>
        <Box>
          <Typography variant="h3">Моя успеваемость</Typography>
        </Box>
        <Box display={"flex"} alignItems={"end"} marginY={4}>
          <Box flex={0.51} height={"100%"}></Box>
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
        <DataGrid className="rdg-light h-auto" style={{ flex: 2 }} columns={columns} rows={rows} />
      </Box>
      {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen} /> : <></>}
    </>
  );
}
