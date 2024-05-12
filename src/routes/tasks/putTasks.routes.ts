import { Router } from "express";
import { putTasks } from "../../controllers/tasks/putTasks";
import { authenticateToken } from "../../controllers/jwt.service";



export const putTasksRouter =(routes:Router) => {
    routes.put("/tasks/:taskId", authenticateToken, putTasks);
}

