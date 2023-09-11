export interface StudentSchedule {
  date: string; // 31.03.2023 ISO
  lessons: {
    time: string; // 08:00 - {{ time + 1 hours 30 min }}
    title: string;
    attendance?: string; // "", NULL, "Н", "П", "Б",
    place?: string;
  }[];
}
