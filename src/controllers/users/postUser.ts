import { Request, Response  } from "express";
import { db } from "../../firebase";
import { QuerySnapshot } from "firebase-admin/firestore";

// - POST /users : Agrega un nuevo usuario

const postUser = async (request: Request, response: Response) => {
    const user = request.body;
    console.log('user', user);
    db.collection("usuarios").where("email", "==", user.email).get()
    .then((querySnapshot: QuerySnapshot) => {
        if (!querySnapshot.empty) {
            response.status(400).send("Ya existe un usuario con ese email");
        } else {
            db.collection("usuarios").add(user).then((docRef) => {
                console.log("User creado con ID: ", docRef.id);
                response.status(201).send({
                    message: "Usuario creado con exito",
                    id: docRef.id
                });
            }).catch((error) => {
                console.error("Error al agregar el usuario: ", error);
                response.status(500).send("Error al agregar el usuario");
            });
        }
    }).catch((error) => {
        console.error("Error al verificar el email: ", error);
        response.status(500).send("Error al verificar el email");
    });
};

export default postUser;


