import { Request, Response, Router } from "express";
import {  db } from "../firebase";
import { Task } from "../models/task.model";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";

const router = Router();

// GET /tasks: Obtener la lista de todas las tareas.
// - POST /tasks: Agregar una nueva tarea.
// - PUT /tasks/{taskId}: Actualizar los datos de una tarea existente.
// - DELETE /tasks/{taskId}: Eliminar una tarea existente.

router.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World !");
});


//Get /tasks
router.get("/tasks", async (request: Request, response: Response) => {
    db.collection("tasks").get().then((querySnapshot: QuerySnapshot) => {
        const tasks: Task[] = querySnapshot.docs.map((doc) => ({ ...doc.data() as Task, id: doc.id }));
        response.status(200).send(tasks);
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        response.status(500).send("Error getting documents");
    });
});

//POST /tasks
router.post("/tasks", async (request: Request, response: Response) => {
    const task: Task = request.body;
    db.collection("tasks").add(task).then((docRef: DocumentReference) => {
        console.log("task added with ID: ", docRef.id);
        task.id = docRef.id;
        response.status(201).send(task);
    }).catch((error) => {
        console.error("Error adding document: ", error);
        response.status(500).send("Error adding document");
    });
});

//PUT /tasks/{taskId}
router.put("/tasks/:taskId", async (request: Request, response: Response) => {
    const taskId = request.params.taskId;
    const task: Task = request.body;
    db.collection("tasks").doc(taskId).set(task).then(() => {
        response.status(200).send(task);
    }).catch((error) => {
        console.error("Error updating document: ", error);
        response.status(500).send("Error updating document");
    });
});

//DELETE /tasks/{taskId}
router.delete("/tasks/:taskId", async (request: Request, response: Response) => {
    const taskId = request.params.taskId;
    db.collection("tasks").doc(taskId).delete().then(() => {
        response.status(200).send(
            {
                message: "Document successfully deleted!",
                id: taskId
            }
        );
    }).catch((error) => {
        console.error("Error deleting document: ", error);
        response.status(500).send("Error deleting document");
    });
});

export default router;


