import { Router } from "express";
import { getTasks } from "../../controllers/tasks/getTasks";
import { authenticateToken } from "../../controllers/jwt.service";

const router = Router();


export const getTasksRouter =(routes:Router) => {
    routes.get("/tasks", authenticateToken, getTasks);
}


