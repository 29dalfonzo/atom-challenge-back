import { Router } from "express";
import { deleteTask } from "../../controllers/tasks/deleteTask";
import { authenticateToken } from "../../controllers/jwt.service";

export const deleteTaskRouter =(routes:Router) => {
    routes.delete("/tasks/:taskId", authenticateToken, deleteTask);
}

