
import { Request, Response  } from "express";
import { db } from "../../firebase";
import { QuerySnapshot } from "firebase-admin/firestore";



// - GET /users/{email}: Busca el usuario si ha sido creado
export const getUser = async (request: Request, response: Response) => {
    const email = request.params.email;
    db.collection("usuarios").where("email", "==", email).get().then((querySnapshot: QuerySnapshot) => {
        if (querySnapshot.empty) {
            response.status(404).send("No se encontró el usuario con ese email");
        } else {
            const userData = querySnapshot.docs[0].data();
            const userId = querySnapshot.docs[0].id;
            response.status(200).send({ ...userData, id: userId });
        }
    }).catch((error) => {
        console.error("Error al buscar el email: ", error);
        response.status(500).send("Error al buscar el email");
    });
};