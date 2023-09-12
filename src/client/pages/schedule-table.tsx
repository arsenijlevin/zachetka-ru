import ScheduleTable from "../components/tables/ScheduleTable";
import Header from "components/Header";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { getUserFromCookie, toProps } from "lib/serverSideUtils";
import { UserDto } from "types/User";

export interface StudentSchedule {
  date: string; // 31.03.2023 ISO
  lessons: {
    time: string; // 08:00 - {{ time + 1 hours 30 min }}
    title: string;
    attendance?: string; // "", NULL, "Н", "П", "Б",
    place?: string;
    professorName?: string;
  }[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = getUserFromCookie(context);

  if (!user?.login) return;

  try {
    const semester = await axios.get<{
      login: string;
      group_id: number;
      groups: {
        id: number;
        title: string;
        semester: number;
      };
    }>(`groups/findForStudent/${user.login}`);

    return toProps({
      semester: semester.data.groups.semester,
      user: user,
    });
  } catch (error) {
    return toProps({});
  }
};

function Table({ semester, user }: { semester: number; user: UserDto }) {
  return (
    <>
      <Header />
      <ScheduleTable semester={semester} user={user} />
    </>
  );
}

export default Table;
