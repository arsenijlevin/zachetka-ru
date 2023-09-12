import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { GradesTablePageProps } from "pages/grades-table";
import { useState } from "react";
import DataGrid, { textEditor } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import rdiff from "recursive-diff";

interface Row {
  student_name: string;
  login: string;
  point1: string;
  point2: string;
  point3: string;
  point_avg: string;
  exam_mark: string;
  total_points: string;
  final_mark: string;
  [index: number]: string;
}

export default function GradesTable({ grades, subjectId, groupId, subject, group }: GradesTablePageProps) {
  const columns = [
    { key: "student_name", name: "ФИО студента", frozen: true, width: "250px" },
    { key: "point1", name: "КТ1", renderEditCell: textEditor },
    { key: "point2", name: "КТ2", renderEditCell: textEditor },
    { key: "point3", name: "КТ3", renderEditCell: textEditor },
    { key: "point_avg", name: "КТ Сред." },
    { key: "exam_mark", name: "Экзамен", renderEditCell: textEditor },
    { key: "total_points", name: "Итоговый балл" },
    { key: "final_mark", name: "Итог" },
  ];
  const initialRows = grades.map((grade) => ({
    student_name: grade.name,
    login: grade.login,
    point1: grade.student_performance[0]?.point1?.toString() ?? "",
    point2: grade.student_performance[0]?.point2?.toString() ?? "",
    point3: grade.student_performance[0]?.point3?.toString() ?? "",
    point_avg: "",
    exam_mark: grade.student_performance[0]?.exam_mark?.toString() ?? "",
    total_points: "",
    final_mark: "",
  }));

  function rowKeyGetter(row: Row) {
    return row.login;
  }

  const [rows, setRows] = useState<Row[]>(initialRows);

  rows.map((row) => {
    const pointAvg = Math.round((parseInt(row.point1) + parseInt(row.point2) + parseInt(row.point3)) / 3);

    if (Number.isSafeInteger(pointAvg)) {
      row.point_avg = Math.round(pointAvg).toString();

      if (row.exam_mark) {
        const totalPoints = (parseInt(row.point_avg) + parseInt(row.exam_mark)) / 2;
        row.total_points = Math.round(totalPoints).toString();
      }
    }

    if (Number.isSafeInteger(parseInt(row.total_points))) {
      row.final_mark = getFinalMarkForPoints(parseInt(row.total_points));
    }
  });

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
      <Box>
        <DataGrid
          className="rdg-light h-auto"
          style={{ flex: 10 }}
          onRowsChange={async (r) => {
            const diff = rdiff.getDiff(rows, r);

            const row = rows[diff[0].path[0] as number];

            const newValue = diff[0].val as string;

            if (newValue === null || newValue === undefined || newValue.trim() === "") return;

            if (!Number.isSafeInteger(+newValue) || +newValue < 0 || +newValue > 50) {
              return;
            }

            const body = {
              [diff[0].path[1]]: parseInt(newValue),
            };

            await axios.post(`student-performance/post-performance/${row.login}/${subjectId}`, body);

            setRows(r);
          }}
          columns={columns}
          rows={rows.sort((a, b) => a.student_name.localeCompare(b.student_name))}
          rowKeyGetter={rowKeyGetter}
        />
      </Box>
    </Box>
  );
}

export function getFinalMarkForPoints(points: number) {
  if (points >= 0 && points < 25) {
    return "Неудовлетворительно";
  }
  if (points >= 25 && points < 35) {
    return "Удовлетворительно";
  }
  if (points >= 35 && points < 45) {
    return "Хорошо";
  }
  if (points >= 45 && points <= 50) {
    return "Отлично";
  }

  return "";
}
