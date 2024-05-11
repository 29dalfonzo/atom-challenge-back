import { Router } from "express";
import { getTasks } from "../../controllers/tasks/getTasks";

const router = Router();


export const getTasksRouter =(routes:Router) => {
    routes.get("/tasks", getTasks);
}


