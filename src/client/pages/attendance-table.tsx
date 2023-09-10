import AttendanceTable from "../components/tables/AttendanceTable";
import Header from "components/Header";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { Subject } from "types/Subject";
import { Group } from "types/Group";
import { Attendance } from "types/Attendance";
import { toProps } from "lib/serverSideUtils";
import { Lesson } from "types/Lesson";
import { DateTime, Interval } from "luxon";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const subjectId = context.query.subjectId as string;
  const groupId = context.query.groupId as string;
  try {
    const subjectTitle = await axios.get<Subject>(`subjects/findOne/${subjectId}`);
    const groupTitle = await axios.get<Group>(`groups/findOne/${groupId}`);
    const attendance = await axios.get<Attendance>(`attendance/findAllForSubjectGroup/${subjectId}/${groupId}`);
    const lessons = await axios.get<Lesson>(`lessons/findAllForSubjectGroup/${subjectId}/${groupId}`);

    return toProps({
      attendance: attendance.data,
      group: groupTitle.data.title,
      subject: subjectTitle.data.title,
      lessons: lessons.data,
      subjectId,
      groupId,
    });
  } catch (error) {
    return toProps({ attendance: [], group: "", subject: "", subjectId, groupId });
  }
};

export interface AttendanceTablePageProps {
  subjectId: string;
  groupId: number;
  subject: string;
  lessons: Lesson[];
  group: string;
  attendance: {
    student: {
      login: string;
      name: string;
      attendance: {
        date: string;
        status: string;
        time: string;
      }[];
    };
  }[];
}

function Table({ attendance, lessons, subjectId, groupId, subject, group }: AttendanceTablePageProps) {
  const lessonsToDates = (lessons: Lesson[]) => {
    const correctDates: DateTime[] = [];
    const startDay = DateTime.now().set({
      hour: 0,
      minute: 0,
      second: 0,
      month: 9,
      day: 1,
    });
    const endDay = DateTime.now().set({
      hour: 0,
      minute: 0,
      second: 0,
      month: 12,
      day: 31,
    });

    const interval = Interval.fromDateTimes(startDay, endDay);
    const split = interval.splitBy({ day: 1 }).map((d) => d.start);

    split.map((day) => {
      lessons.map((lesson) => {
        if (lesson.frequency === "Знаменатель") {
          if (day?.weekNumber && day?.weekNumber % 2 === 0) {
            const lessonTime = DateTime.fromFormat(lesson.time, "HH:mm");
            const lessonHours = lessonTime.hour;
            const lessonMinutes = lessonTime.minute;
            const lessonWeekDayNumber = getWeekDayNumber(lesson.week_day);

            if (day.weekday === lessonWeekDayNumber) {
              correctDates.push(
                day.set({
                  hour: lessonHours,
                  minute: lessonMinutes,
                  second: 0,
                  millisecond: 0,
                })
              );
            }
          }
        }

        if (lesson.frequency === "Числитель") {
          if (day?.weekNumber && day?.weekNumber % 2 === 1) {
            const lessonTime = DateTime.fromFormat(lesson.time, "HH:mm");
            const lessonHours = lessonTime.hour;
            const lessonMinutes = lessonTime.minute;
            const lessonWeekDayNumber = getWeekDayNumber(lesson.week_day);

            if (day.weekday === lessonWeekDayNumber) {
              correctDates.push(
                day.set({
                  hour: lessonHours,
                  minute: lessonMinutes,
                  second: 0,
                  millisecond: 0,
                })
              );
            }
          }
        }
      });
    });

    return correctDates;
  };

  return (
    <>
      <Header />
      <AttendanceTable
        attendance={attendance}
        lessonDates={lessonsToDates(lessons)}
        lessons={lessons}
        subjectId={subjectId}
        groupId={groupId}
        subject={subject}
        group={group}
      />
    </>
  );
}

export default Table;

function getWeekDayNumber(weekDay: string) {
  let number = 1;

  switch (weekDay) {
    case "ПН": {
      number = 1;
      break;
    }
    case "ВТ": {
      number = 2;
      break;
    }
    case "СР": {
      number = 3;
      break;
    }
    case "ЧТ": {
      number = 4;
      break;
    }
    case "ПТ": {
      number = 5;
      break;
    }
    case "СБ": {
      number = 6;
      break;
    }
    case "ВС": {
      number = 7;
      break;
    }
  }

  return number;
}

export function getDayNumberByWeekDay(weekDay: number) {
  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  return weekDays[weekDay];
}

export function getWeekFrequencyFromDay(day: DateTime) {
  if (day?.weekNumber && day?.weekNumber % 2 === 1) {
    return "Числитель";
  } else {
    return "Знаменатель";
  }
}
