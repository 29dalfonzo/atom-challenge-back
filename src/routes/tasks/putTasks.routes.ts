import { Router } from "express";
import { putTasks } from "../../controllers/tasks/putTasks";



export const putTasksRouter =(routes:Router) => {
    routes.put("/tasks/:taskId", putTasks);
}

