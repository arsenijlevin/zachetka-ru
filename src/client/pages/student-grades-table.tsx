import StudentGradesTable from "../components/tables/StudentGradesTable";
import Header from "components/Header";

/**
 * TODO: Таблица с оценками по студенту. Брать из базы
 */

function Table() {
  return (
    <>
      <Header />
      <StudentGradesTable />
    </>
  );
}

export default Table;
