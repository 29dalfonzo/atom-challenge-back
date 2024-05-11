import { Request, Response, Router } from "express";
import { db } from "../../firebase";
import { Task } from "../../models/task.model";
import { DocumentReference  } from "firebase-admin/firestore";
import { getUserId } from "../jwt.service";

//POST /tasks
export const postTasks = async (request: Request, response: Response) => {
    const task: Task = request.body;
    const user_id = getUserId(request.headers.authorization as string);
    if (!task.title) {
        return response.status(400).send("Title is required");
    }
    if (!task.description) {
        return response.status(400).send("Description is required");
    }
    if (task.done === undefined) {
        return response.status(400).send("Done is required");
    }
    task.user_id = user_id;
    db.collection("tasks").add(task).then((docRef: DocumentReference) => {
        task.id = docRef.id;
        response.status(201).send(task);
    }).catch((error) => {
        response.status(500).send("Error adding document");
    });
};
