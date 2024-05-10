import { Request, Response, Router } from "express";
import {  db } from "../firebase";

const router = Router();

// GET /tasks: Obtener la lista de todas las tareas.
// - POST /tasks: Agregar una nueva tarea.
// - PUT /tasks/{taskId}: Actualizar los datos de una tarea existente.
// - DELETE /tasks/{taskId}: Eliminar una tarea existente.

router.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World !");
});


//Get /tasks
router.get("/tasks", async (request, response) => {
    db.collection("tasks").get().then((querySnapshot) => {
        // querySnapshot.forEach((doc) => {
        //     console.log(`${doc.id} => ${doc.data()}`);
        // });
        response.status(200).send(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        response.status(500).send("Error getting documents");
    });
});

//POST /tasks
router.post("/tasks", async (request, response) => {
    const task = request.body;
    console.log('task', task);
    db.collection("tasks").add(task).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        response.status(201).send("Document written with ID: " + docRef.id);
    }).catch((error) => {
        console.error("Error adding document: ", error);
        response.status(500).send("Error adding document");
    });
});

//PUT /tasks/{taskId}
router.put("/tasks/:taskId", async (request, response) => {
    const taskId = request.params.taskId;
    const task = request.body;
    db.collection("tasks").doc(taskId).set(task).then(() => {
        response.status(200).send("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
        response.status(500).send("Error updating document");
    });
});

//DELETE /tasks/{taskId}
router.delete("/tasks/:taskId", async (request, response) => {
    const taskId = request.params.taskId;
    db.collection("tasks").doc(taskId).delete().then(() => {
        response.status(200).send("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error deleting document: ", error);
        response.status(500).send("Error deleting document");
    });
});

export default router;


