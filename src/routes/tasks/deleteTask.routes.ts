import { Router } from "express";
import { deleteTask } from "../../controllers/tasks/deleteTask";

export const deleteTaskRouter =(routes:Router) => {
    routes.delete("/tasks/:taskId", deleteTask);
}