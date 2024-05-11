import { Request, Response } from "express";
import { db } from "../../firebase";
import { Task } from "../../models/task.model";

//PUT /tasks/{taskId}
export const putTasks = async (request: Request, response: Response) => {
    const taskId = request.params.taskId;
    const task: Task = request.body;
    db.collection("tasks").doc(taskId).set(task).then(() => {
        response.status(200).send(task);
    }).catch((error) => {
        console.error("Error updating document: ", error);
        response.status(500).send("Error updating document");
    });
};


