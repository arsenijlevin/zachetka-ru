import ScheduleTable from "../components/tables/ScheduleTable";
import Header from "components/Header";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { getUserFromCookie, toProps } from "lib/serverSideUtils";

interface StudentSchedule {
  date: string; // 31.03.2023 ISO
  lessons: {
    time: string; // 08:00 - {{ time + 1 hours 30 min }}
    title: string;
    attendance?: string; // "", NULL, "Н", "П", "Б",
    place?: string;
  }[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = getUserFromCookie(context);

  if (!user?.login) return;

  try {
    const body = {
      start_date: "01-09-2023",
      end_date: "31-12-2023",
    };

    const studentSchedule = await axios.post<StudentSchedule>(
      `student-performance/getStudentSchedule/${user.login}`,
      body
    );

    const data = studentSchedule.data;
    
    return toProps({
      studentSchedule: data,
    });
  } catch (error) {
    return toProps({});
  }
};

function Table({ studentSchedule }: { studentSchedule: StudentSchedule }) {
  console.log(studentSchedule);

  return (
    <>
      <Header />
      <ScheduleTable />
    </>
  );
}

export default Table;
