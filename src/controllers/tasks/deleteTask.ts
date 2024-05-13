import { Request, Response } from "express";
import { db } from "../../firebase";
import { getUserId } from "../jwt.service";
import { DocumentSnapshot } from "firebase-admin/firestore";

//DELETE /tasks/{taskId}

export const deleteTask = async (request: Request, response: Response) => {
    const taskId = request.params.taskId;
    const docRef = db.collection("tasks").doc(taskId);

    docRef.get().then((doc) => {
        if (!doc.exists) {
            return response.status(404).send({ message: "Task not found" });
        } else {
            docRef.delete().then(() => {
                response.status(200).send({
                    message: "Document successfully deleted!",
                    id: taskId
                });
            }).catch((error) => {
                response.status(500).send("Error removing document");
            });
        }
    }).catch((error) => {
        response.status(500).send("Error retrieving document");
    });
};