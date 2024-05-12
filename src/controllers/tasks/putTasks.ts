import { Request, Response } from "express";
import { db } from "../../firebase";
import { Task } from "../../models/task.model";
import { getUserId } from "../jwt.service";

//PUT /tasks/{taskId}
export const putTasks = async (request: Request, response: Response) => {
    const taskId = request.params.taskId;
    const task: Task = request.body;
    const user_id = getUserId(request.headers.authorization as string);
    if (user_id !== task.user_id) {
        return response.status(401).send("Unauthorized");
    }
    db.collection("tasks").doc(taskId).set(task).then(() => {
        response.status(200).send(task);
    }).catch((error) => {
        response.status(500).send("Error updating document");
    });
};


