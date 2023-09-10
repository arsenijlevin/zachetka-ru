import GradesTable from "../components/tables/GradesTable";
import Header from "components/Header";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { toProps } from "lib/serverSideUtils";
import { Group } from "types/Group";
import { Subject } from "types/Subject";
import { Grades } from "types/Grades";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const subjectId = context.query.subjectId as string;
  const groupId = context.query.groupId as string;

  try {
    const subjectTitle = await axios.get<Subject>(`subjects/findOne/${subjectId}`);
    const groupTitle = await axios.get<Group>(`groups/findOne/${groupId}`);
    const grades = await axios.get<Grades>(`student-performance/findAllForSubjectGroup/${subjectId}/${groupId}`);
    
    return toProps({
      grades: grades.data,
      group: groupTitle.data.title,
      subject: subjectTitle.data.title,
      subjectId,
      groupId,
    });
  } catch (error) {
    return toProps({ grades: [], group: "", subject: "", subjectId, groupId });
  }
};

export interface GradesTablePageProps {
  subjectId: number;
  groupId: number;
  subject: string;
  group: string;
  grades: Grades[];
}

function Table({ grades, subjectId, groupId, subject, group }: GradesTablePageProps) {
  return (
    <>
      <Header />
      <GradesTable grades={grades} subjectId={subjectId} groupId={groupId} subject={subject} group={group} />
    </>
  );
}

export default Table;
