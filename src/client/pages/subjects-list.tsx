import SubjectsList from "../components/lists/SubjectsList";
import Header from "components/Header";

function List() {
  const subjects = ["Технологии программирования (6 семестр)"];

  return (
    <>
      <Header />
      <SubjectsList subjects={subjects} />
    </>
  );
}

export default List;
