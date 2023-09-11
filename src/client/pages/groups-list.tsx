import GroupsList from "../components/lists/GroupsList";
import Header from "components/Header";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GroupsForProfessor } from "types/GroupsForProfessor";
import { Group } from "types/Group";
import { Subject } from "types/Subject";
import { getUserFromCookie, toProps } from "lib/serverSideUtils";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const subjectId = context.query.subject as string;

  if (!subjectId) return toProps({ groups: [], subject: "" });
  try {
    const user = getUserFromCookie(context);

    const groups = await axios.get<Group[]>(`groups/getGroupsForSubjectProfessor/${subjectId}/${user.login}`);
    const subjectTitle = await axios.get<Subject>(`subjects/findOne/${subjectId}`);
    return toProps({ groups: groups.data, subject: subjectTitle.data, subjectId });
  } catch (error) {
    return toProps({ groups: [], subject: "", subjectId });
  }
};

interface GroupListProps {
  groups: GroupsForProfessor[];
  subject: {
    semester: number;
    title: string;
    id: number;
  };
  subjectId: number;
}

function List({ groups, subject, subjectId }: GroupListProps) {
  return (
    <>
      <Header />
      <GroupsList groups={groups} subject={subject} subjectId={subjectId} />
    </>
  );
}

export default List;
