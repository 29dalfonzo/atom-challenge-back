import { Request, Response  } from "express";
import { db } from "../../firebase";
import { Task } from "../../models/task.model";
import {  QuerySnapshot } from "firebase-admin/firestore";
import { verifyToken } from "../jwt.service";


// GET /tasks: Obtener la lista de todas las tareas.

export const getTasks = async (request: Request, response: Response) => {
    const token = request.headers.authorization;
    const validToken = verifyToken(token as string);
    if (!validToken) {
        return response.status(401).send("Unauthorized");
    }
    db.collection("tasks").get().then((querySnapshot: QuerySnapshot) => {
        const tasks: Task[] = querySnapshot.docs.map((doc) => ({ ...doc.data() as Task, id: doc.id }));
        response.status(200).send(tasks);
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        response.status(500).send("Error getting documents");
    });
};
