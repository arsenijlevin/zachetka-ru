import StudentGradesTable from "../components/tables/StudentGradesTable";
import Header from "components/Header";
import { getUserFromCookie, toProps } from "lib/serverSideUtils";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

export interface StudentPerformanceTableData {
  id: number;
  professor_subject: {
    users: {
      name: string;
    };
  }[];
  reporting_type: string;
  semester: number;
  student_performance: {
    exam_mark: number;
    point1: number;
    point2: number;
    point3: number;
    student_login: string;
    subject_id: number;
  }[];
  title: string;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = getUserFromCookie(context);

  if (!user?.login) return;

  try {
    const performance = await axios.get<StudentPerformanceTableData[]>(
      `student-performance/findAllForStudent/${user.login}`
    );

    return toProps({
      performance: performance.data,
    });
  } catch (error) {
    return toProps({});
  }
};

function Table({ performance }: { performance: StudentPerformanceTableData[] }) {
  console.log(performance);

  return (
    <>
      <Header />
      <StudentGradesTable performance={performance} />
    </>
  );
}

export default Table;
