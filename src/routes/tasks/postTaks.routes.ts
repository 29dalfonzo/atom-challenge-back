import { authenticateToken } from "../../controllers/jwt.service";
import { postTasks } from "../../controllers/tasks/postTasks";
import { Router } from "express";



export const postTasksRouter =(routes:Router) => {
    routes.post("/tasks", authenticateToken, postTasks);
}

