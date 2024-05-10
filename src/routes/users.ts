import { Request, Response, Router } from "express";
import {  db } from "../firebase";

const router = Router();


// - GET /users/{email}: Busca el usuario si ha sido creado
// - POST /users : Agrega un nuevo usuario

router.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World !");
});

router.get("/users", async (request, response) => {
    db.collection("usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
        response.status(200).send(querySnapshot.docs.map((doc) => doc.data()));
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        response.status(500).send("Error getting documents");
    });
});


//Get /users/{email}
router.get("/users/:email", async (request, response) => {
    const email = request.params.email;
    db.collection("usuarios").where("email", "==", email).get().then((querySnapshot) => {
        response.status(200).send(querySnapshot.docs[0].data());
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        response.status(500).send("Error getting documents");
    });
});

//POST /users
router.post("/users", async (request, response) => {
    const user = request.body;
    console.log('user', user);
    db.collection("usuarios").add(user).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        response.status(201).send("Document written with ID: " + docRef.id);
    }).catch((error) => {
        console.error("Error adding document: ", error);
        response.status(500).send("Error adding document");
    });
});


export default router;

