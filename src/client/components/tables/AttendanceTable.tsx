import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import * as React from "react";
import Link from "next/link";
import { AttendanceTablePageProps, getDayNumberByWeekDay, getWeekFrequencyFromDay } from "pages/attendance-table";
import rdiff from "recursive-diff";
import DataGrid from "react-data-grid";
import { useEffect, useState } from "react";
import { textEditor } from "react-data-grid";

import "react-data-grid/lib/styles.css";
import { DateTime } from "luxon";
import axios from "axios";
import { getUserFromCookie } from "lib/serverSideUtils";

interface Row {
  student_name: string;
  login: string;
  attendance: {
    date: string;
    status: string;
    time: string;
  }[];
  [index: number]: string;
}

interface SumRow {
  N: number;
  P: number;
  B: number;
  all: number;
}

export type AttendanceTableProps = AttendanceTablePageProps & {
  lessonDates: DateTime[];
};

export default function AttendanceTable({
  attendance,
  lessonDates,
  subjectId,
  groupId,
  subject,
  group,
}: AttendanceTableProps) {
  const columns = [{ key: "student_name", name: "ФИО студента", frozen: true, width: "250px" }] as Record<
    string,
    unknown
  >[] &
    {
      key: string;
      login: string;
      name: string;
      frozen: boolean;
      width: string;
    }[];
  const initialRows = attendance.map((item, index) => ({
    student_name: item.student.name,
    login: item.student.login,
    attendance: item.student.attendance,
  })) as Row[];

  lessonDates.forEach((date, index) => {
    columns.push({
      key: `${index}`,
      name: `${date.toFormat("dd-MM-yyyy HH:mm")}`,
      renderEditCell: textEditor,
      width: "100px",
    });
  });

  const sumColumns = [
    {
      key: "N",
      name: "Н",
    },
    {
      key: "P",
      name: "П",
    },
    {
      key: "B",
      name: "Б",
    },
    {
      key: "all",
      name: "Всего",
    },
  ];

  initialRows.forEach((row) => {
    lessonDates.forEach((date, dateIndex) => {
      row.attendance.map((att) => {
        const attDate = DateTime.fromISO(att.date).set({
          hour: parseInt(att.time.split(":")[0]),
          minute: parseInt(att.time.split(":")[1]),
          second: 0,
          millisecond: 0,
        });

        const lessonDate = date.set({
          second: 0,
          millisecond: 0,
        });

        if (attDate.equals(lessonDate)) {
          row[dateIndex] = att.status;
        }
      });

      if (!row[dateIndex]) row[dateIndex] = "";
    });
  });
  function rowKeyGetter(row: Row) {
    return row.login;
  }

  const [rows, setRows] = useState<Row[]>(initialRows);
  const [sumRows, setSumRows] = useState<SumRow[]>(
    initialRows.map((row) => {
      const N = Object.values(row).filter((value) => value === "Н").length;
      const P = Object.values(row).filter((value) => value === "П").length;
      const B = Object.values(row).filter((value) => value === "Б").length;
      const all = N + B + P;

      return {
        N,
        P,
        B,
        all,
      };
    })
  );

  useEffect(() => {
    setSumRows(
      rows.map((row) => {
        const N = Object.values(row).filter((value) => value === "Н").length;
        const P = Object.values(row).filter((value) => value === "П").length;
        const B = Object.values(row).filter((value) => value === "Б").length;
        const all = N + B + P;

        return {
          N,
          P,
          B,
          all,
        };
      })
    );
  }, [rows]);

  return (
    <Box width={"90%"} marginX={"auto"} display={"flex"} flexDirection={"column"} gap={2}>
      <Box>
        <Typography variant="h3">Учёт посещаемости</Typography>
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
              href={{ pathname: "/grades-table", query: { groupId: groupId, subjectId: subjectId } }}
            >
              Учёт посещаемости
            </Link>
          </Breadcrumbs>
        </Box>
        <Box>
          <Link href={{ pathname: "/grades-table", query: { groupId: groupId, subjectId: subjectId } }} passHref>
            <Button variant="outlined">Открыть оценки</Button>
          </Link>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">Общее количество занятий: {lessonDates.length}</Typography>
      </Box>
      <Box className={"flex flex-row"}>
        <DataGrid
          className="rdg-light h-auto"
          style={{ flex: 10 }}
          onRowsChange={async (r) => {
            const diff = rdiff.getDiff(rows, r);
            const timeIndex = parseInt(diff[0].path[1] as string) + 1;
            const time = columns[timeIndex] as {
              key: string;
              name: string;
            };

            const row = rows[diff[0].path[0] as number];
            const newValue = diff[0].val as string;
            const user = getUserFromCookie();

            const body = {
              student_login: row.login,
              status: newValue,
              time: time.name.split(" ")[1],
              date: DateTime.fromFormat(time.name, "dd-MM-yyyy HH:mm").toISO(),
              week_day: getDayNumberByWeekDay(DateTime.fromFormat(time.name, "dd-MM-yyyy HH:mm").weekday - 1),
              subject_id: parseInt(subjectId),
              frequency: getWeekFrequencyFromDay(DateTime.fromFormat(time.name, "dd-MM-yyyy HH:mm")),
              professor_login: user.login,
            };

            await axios.post("attendance/post", body);

            setRows(r);
          }}
          columns={columns}
          rows={rows.sort((a, b) => a.student_name.localeCompare(b.student_name))}
          rowKeyGetter={rowKeyGetter}
        />
        <DataGrid
          className="rdg-light h-auto"
          style={{ flex: 2 }}
          onRowsChange={setSumRows}
          columns={sumColumns}
          rows={sumRows}
        />
      </Box>
    </Box>
  );
}