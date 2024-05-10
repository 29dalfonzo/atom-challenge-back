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
        if (querySnapshot.empty) {
            response.status(404).send("No se encontró el usuario con ese email");
        } else {
            response.status(200).send(querySnapshot.docs[0].data());
        }
    }).catch((error) => {
        console.error("Error al buscar el email: ", error);
        response.status(500).send("Error al buscar el email");
    });
});

//POST /users
router.post("/users", async (request, response) => {
    const user = request.body;
    console.log('user', user);
    db.collection("usuarios").where("email", "==", user.email).get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            response.status(400).send("Ya existe un usuario con ese email");
        } else {
            db.collection("usuarios").add(user).then((docRef) => {
                console.log("Documento creado con ID: ", docRef.id);
                response.status(201).send(docRef.id);
            }).catch((error) => {
                console.error("Error al agregar el documento: ", error);
                response.status(500).send("Error al agregar el documento");
            });
        }
    }).catch((error) => {
        console.error("Error al verificar el email: ", error);
        response.status(500).send("Error al verificar el email");
    });
});


export default router;

