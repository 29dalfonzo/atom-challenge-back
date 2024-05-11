export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  date?: Date;
}
