import SubjectsList from "../components/lists/SubjectsList";
import Header from "components/Header";
import axios from "axios";
import { UserDto } from "@shared/types/user/user.dto";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SubjectForProfessor } from "types/SubjectForProfessor";
import { getUserFromCookie, toProps } from "lib/serverSideUtils";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const user: UserDto = getUserFromCookie(context);

    const subjects = await axios.get<SubjectForProfessor[]>(`subjects/findAllForProfessor/${user.login}`);

    return toProps({ subjects: subjects.data });
  } catch (error) {
    return toProps({ subjects: [] });
  }
};

function List({ subjects }: { subjects: SubjectForProfessor[] }) {
  return (
    <>
      <Header />
      <SubjectsList subjects={subjects} />
    </>
  );
}

export default List;
