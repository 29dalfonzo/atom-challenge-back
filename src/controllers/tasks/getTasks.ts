import { Request, Response, Router } from "express";
import { db } from "../../firebase";
import { Task } from "../../models/task.model";
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
export const getTasks = async (request: Request, response: Response) => {
    db.collection("tasks").get().then((querySnapshot: QuerySnapshot) => {
        const tasks: Task[] = querySnapshot.docs.map((doc) => ({ ...doc.data() as Task, id: doc.id }));
        response.status(200).send(tasks);
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        response.status(500).send("Error getting documents");
    });
};
