import { Request, Response  } from "express";
import { db } from "../../firebase";
import { QuerySnapshot } from "firebase-admin/firestore";
import { generateToken } from "../jwt.service";

// - POST /users : Agrega un nuevo usuario

const postUser = async (request: Request, response: Response) => {
    const user = request.body;
    db.collection("usuarios").where("email", "==", user.email).get()
    .then((querySnapshot: QuerySnapshot) => {
        if (!querySnapshot.empty) {
            response.status(400).send("Ya existe un usuario con ese email");
        } else {
            db.collection("usuarios").add(user).then((docRef) => {
                response.status(201).send({
                    message: "Usuario creado con exito",
                    id: docRef.id,
                    token: generateToken({ email: user.email, id: docRef.id }),
                });
            }).catch((error) => {
                response.status(500).send("Error al agregar el usuario");
            });
        }
    }).catch((error) => {
        response.status(500).send("Error al verificar el email:"+error);
    });
};

export default postUser;


