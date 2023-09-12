import { Box, Button, Table, TableBody, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import CodeCheckPopUp from "components/pop-ups/CodeCheckPopUp";
import { Fragment, useEffect, useState } from "react";
import useAPI from "hooks/useApi";
import { UserDto } from "types/User";
import { DateTime, Interval } from "luxon";
import { StudentSchedule } from "pages/schedule-table";
import { getDayNumberByWeekDay } from "pages/attendance-table";

export default function ScheduleTable({ semester, user }: { semester: number; user: UserDto }) {
  const [isPopupOpen, setIsPopupOpen] = useState(0);
  const modals = [null, CodeCheckPopUp];
  const handleOpenCodeCheck = () => setIsPopupOpen(1);
  const SelectedModal = modals[isPopupOpen];

  const firstSemesterDates = {
    start_date: "04-09-2023",
    end_date: "10-09-2023",
    max_date: "31-12-2023",
  };

  const secondSemesterDates = {
    start_date: "05-02-2024",
    end_date: "11-02-2024",
    max_date: "31-05-2024",
  };

  const dates = semester % 2 === 1 ? firstSemesterDates : secondSemesterDates;

  const [startDate, setStartDate] = useState<string | null>(
    DateTime.fromFormat(dates.start_date, "dd-MM-yyyy").toISO()
  );
  const [endDate, setEndDate] = useState<string | null>(DateTime.fromFormat(dates.end_date, "dd-MM-yyyy").toISO());

  const tableForward = () => {
    if (!schedule.data) return;

    const nextStartDate = DateTime.fromISO(startDate ?? "").plus({ days: 7 });
    const nextEndDate = DateTime.fromISO(endDate ?? "").plus({ days: 7 });

    if (!nextStartDate.isValid || !nextEndDate.isValid) return;

    if (nextStartDate.toMillis() > DateTime.fromFormat(dates.max_date, "dd-MM-yyyy").toMillis()) {
      return;
    }

    setStartDate(nextStartDate.toISO());
    setEndDate(nextEndDate.toISO());
  };

  const tableBack = () => {
    if (!schedule.data) return;

    const prevStartDate = DateTime.fromISO(startDate ?? "").minus({ days: 7 });
    const prevEndDate = DateTime.fromISO(endDate ?? "").minus({ days: 7 });

    if (!prevStartDate.isValid || !prevEndDate.isValid) return;

    if (prevStartDate.toMillis() < DateTime.fromFormat(dates.start_date, "dd-MM-yyyy").toMillis()) {
      return;
    }

    setStartDate(prevStartDate.toISO());
    setEndDate(prevEndDate.toISO());
  };

  const schedule = useAPI<StudentSchedule[]>(`student-performance/getStudentSchedule/${user.login ?? ""}`, {
    method: "POST",
    data: {
      start_date: DateTime.fromISO(startDate ?? "")?.toFormat("dd-MM-yyyy"),
      end_date: DateTime.fromISO(endDate ?? "")?.toFormat("dd-MM-yyyy"),
    },
  });

  useEffect(() => {
    void schedule.fetchData();
  }, [startDate]);

  if (schedule.loading || schedule.error || !schedule.data) return <></>;

  const interval = Interval.fromDateTimes(DateTime.fromISO(startDate ?? ""), DateTime.fromISO(endDate ?? ""));
  const split = interval.splitBy({ day: 1 }).map((d: Interval) => d.start);

  const monthLeftTable =
    DateTime.fromISO(startDate ?? "")
      .plus({ day: 1 })
      .setLocale("ru").monthLong ?? "";
  const monthRightTable =
    DateTime.fromISO(startDate ?? "")
      .plus({ day: 4 })
      .setLocale("ru").monthLong ?? "";
  return (
    <>
      <Box sx={{ width: "90%", margin: "0 auto" }}>
        <Box>
          <Typography variant="h3">Моя посещаемость</Typography>
        </Box>
        <Box display={"flex"} alignItems={"end"} marginY={4}>
          <Box flex={0.51} height={"100%"}></Box>
          <Box flex={0.49} display={"flex"} gap={5}>
            <Button variant="outlined" style={{ width: "100%" }} onClick={handleOpenCodeCheck}>
              Код посещаемости
            </Button>
            <Link href="student-grades-table" passHref style={{ flex: 1 }}>
              <Button variant="outlined" style={{ width: "100%" }}>
                Открыть успеваемость
              </Button>
            </Link>
          </Box>
        </Box>
        <Box display={"flex"} gap={5} textAlign={"center"}>
          <Box flex={0.5}>
            <Table
              sx={{
                td: {
                  border: "1px solid black",
                  fontSize: "20px",
                },
              }}
            >
              <TableBody>
                <tr>
                  <td>Месяц</td>
                  <td>{monthLeftTable}</td>
                </tr>
              </TableBody>
            </Table>
          </Box>
          <Box flex={0.5}>
            <Table
              sx={{
                td: {
                  border: "1px solid black",
                  fontSize: "20px",
                },
              }}
            >
              <TableBody>
                <tr>
                  <td>Месяц</td>
                  <td>{monthRightTable}</td>
                </tr>
              </TableBody>
            </Table>
          </Box>
        </Box>

        <Box display={"flex"} marginY={1}>
          <Box flex={1}>
            <Button onClick={tableBack} disabled={schedule.loading}>
              <ArrowBackIcon></ArrowBackIcon>
            </Button>
          </Box>

          <Box>
            <Button onClick={tableForward} disabled={schedule.loading}>
              <ArrowForwardIcon></ArrowForwardIcon>
            </Button>
          </Box>
        </Box>
        <Box display={"flex"} gap={5}>
          <Box flex={0.5}>
            <Table
              sx={{
                td: {
                  border: "1px solid black",
                  textAlign: "center",
                },
              }}
            >
              <TableBody>
                {split.map((day, dayIndex) => {
                  if (dayIndex >= 3) return <Fragment key={dayIndex}></Fragment>;
                  const todayLessons = schedule.data?.find((data) => {
                    if (DateTime.fromISO(data.date).day === day?.day) return data;
                  });
                  return (
                    <Fragment key={dayIndex}>
                      {times.map((time, index) => {
                        const lesson = todayLessons?.lessons.find((lesson) => lesson.time === time.start);
                        const lessonName = lesson ? `${lesson.title ?? ""}` : "";
                        const lessonPlace = lesson?.place ? `, ${lesson.place}` : "";
                        const lessonProfessorName = lesson?.professorName ? `, ${lesson.professorName} ` : "";
                        const splitProfessorName = lessonProfessorName.split(" ");
                        const shortProfessorName =
                          splitProfessorName.length > 1
                            ? `, ${splitProfessorName[1]} ${splitProfessorName[2].charAt(
                                0
                              )}. ${splitProfessorName[3].charAt(0)}.`
                            : "";
                        const lessonTitle = `${lessonName}${shortProfessorName}${lessonPlace}`;
                        const lessonAttendance = lesson ? `${lesson.attendance}` : "";
                        if (index === 0) {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"} style={{ fontWeight: "bold" }} rowSpan={4}>
                                {day?.day ?? ""}
                              </td>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        } else if (index >= 1 && index <= 3) {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        } else if (index === 4) {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"} style={{ fontWeight: "bold" }} rowSpan={4}>
                                {getDayNumberByWeekDay((day?.weekday ?? 1) - 1)}
                              </td>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        }
                      })}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
          <Box flex={0.5}>
            <Table
              sx={{
                td: {
                  border: "1px solid black",
                  textAlign: "center",
                },
              }}
            >
              <TableBody>
                {split.map((day, dayIndex) => {
                  if (dayIndex <= 2) return <Fragment key={dayIndex}></Fragment>;
                  const todayLessons = schedule.data?.find((data) => {
                    if (DateTime.fromISO(data.date).day === day?.day) return data;
                  });
                  return (
                    <Fragment key={dayIndex}>
                      {times.map((time, index) => {
                        const lesson = todayLessons?.lessons.find((lesson) => lesson.time === time.start);
                        const lessonName = lesson ? `${lesson.title ?? ""}` : "";
                        const lessonPlace = lesson?.place ? `, ${lesson.place}` : "";
                        const lessonProfessorName = lesson?.professorName ? `, ${lesson.professorName} ` : "";
                        const splitProfessorName = lessonProfessorName.split(" ");
                        const shortProfessorName =
                          splitProfessorName.length > 1
                            ? `, ${splitProfessorName[1]} ${splitProfessorName[2].charAt(
                                0
                              )}. ${splitProfessorName[3].charAt(0)}.`
                            : "";
                        const lessonTitle = `${lessonName}${shortProfessorName}${lessonPlace}`;
                        const lessonAttendance = lesson ? `${lesson.attendance}` : "";
                        if (index === 0) {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"} style={{ fontWeight: "bold" }} rowSpan={4}>
                                {day?.day ?? ""}
                              </td>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        } else if (index >= 1 && index <= 3) {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        } else if (index === 4) {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"} style={{ fontWeight: "bold" }} rowSpan={4}>
                                {getDayNumberByWeekDay((day?.weekday ?? 1) - 1)}
                              </td>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr key={index * times.length + dayIndex}>
                              <td width={"100px"}>{`${time.start}-${time.end}`}</td>
                              <td>{lessonTitle}</td>
                              <td width={"50px"}>{lessonAttendance}</td>
                            </tr>
                          );
                        }
                      })}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
      {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen} /> : <></>}
    </>
  );
}

const times = [
  {
    start: "08:00",
    end: "09:30",
  },
  {
    start: "09:45",
    end: "11:20",
  },
  {
    start: "11:30",
    end: "13:05",
  },
  {
    start: "13:25",
    end: "15:00",
  },
  {
    start: "15:10",
    end: "16:45",
  },
  {
    start: "16:55",
    end: "18:30",
  },
  {
    start: "18:40",
    end: "20:00",
  },
  {
    start: "20:10",
    end: "21:30",
  },
];
