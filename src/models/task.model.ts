export interface Task {
  user_id: string;
  id: string;
  title: string;
  description: string;
  done: boolean;
  date?: Date;
}
