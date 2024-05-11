import { Request, Response, Router } from "express";
import { db } from "../../firebase";
import { Task } from "../../models/task.model";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";

const router = Router();
//POST /tasks
export const postTasks = async (request: Request, response: Response) => {
    const task: Task = request.body;
    db.collection("tasks").add(task).then((docRef: DocumentReference) => {
        console.log("task added with ID: ", docRef.id);
        task.id = docRef.id;
        response.status(201).send(task);
    }).catch((error) => {
        console.error("Error adding document: ", error);
        response.status(500).send("Error adding document");
    });
};

