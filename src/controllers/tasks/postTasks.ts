import { Request, Response, Router } from "express";
import { db } from "../../firebase";
import { Task } from "../../models/task.model";
import { DocumentReference  } from "firebase-admin/firestore";

//POST /tasks
export const postTasks = async (request: Request, response: Response) => {
    const task: Task = request.body;
    if (!task.title) {
        return response.status(400).send("Title is required");
    }
    if (!task.description) {
        return response.status(400).send("Description is required");
    }
    if (task.done === undefined) {
        return response.status(400).send("Done is required");
    }
    db.collection("tasks").add(task).then((docRef: DocumentReference) => {
        console.log("task added with ID: ", docRef.id);
        task.id = docRef.id;
        response.status(201).send(task);
    }).catch((error) => {
        response.status(500).send("Error adding document");
    });
};