export type UserRole = 'student' | 'teacher' | 'admin' | null;

export interface Grade {
  id: string;
  subject: string;
  value: number;
  date: string;
  teacher: string;
  editable: boolean;
}

export interface Schedule {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface BellSchedule {
  lesson: number;
  start: string;
  end: string;
}
