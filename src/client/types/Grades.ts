import { StudentPerformance } from "types/StudentPerformance";

export interface Grades {
  login: string;
  name: string;
  student_performance: StudentPerformance[];
}
