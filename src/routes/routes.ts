import { Router } from "express";
import { getTasksRouter } from "./tasks/getTasks.routes";
import { postTasksRouter } from "./tasks/postTaks.routes";
import { putTasksRouter } from "./tasks/putTasks.routes";
import { getUserRouter } from "./users/getUser.routes";
import { postUserRouter } from "./users/postUser.routes";
import { deleteTaskRouter } from "./tasks/deleteTask.routes";

const routes = Router();

//Tasks
/* GET */
getTasksRouter(routes);
/* POST */
postTasksRouter(routes);
/* PUT */
putTasksRouter(routes);
/* DELETE */
deleteTaskRouter (routes);


//Users
/* GET */
getUserRouter (routes);
/* POST */
postUserRouter (routes);

export default routes;


