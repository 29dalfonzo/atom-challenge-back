import { Request, Response } from "express";
import { db } from "../../firebase";

//DELETE /tasks/{taskId}

export const deleteTask = async (request: Request, response: Response) => {
    const taskId = request.params.taskId;
    db.collection("tasks").doc(taskId).delete().then(() => {
        response.status(200).send(
            {
                message: "Document successfully deleted!",
                id: taskId
            }
        );
    }).catch((error) => {
        console.error("Error removing document: ", error);
        response.status(500).send("Error removing document");
    });
};