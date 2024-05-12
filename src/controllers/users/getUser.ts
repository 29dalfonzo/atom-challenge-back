
import { Request, Response  } from "express";
import { db } from "../../firebase";
import { QuerySnapshot } from "firebase-admin/firestore";
import { generateToken } from "../jwt.service";




// - GET /users/{email}: Busca el usuario si ha sido creado
export const getUser = async (request: Request, response: Response) => {
    const email = request.params.email;
    db.collection("usuarios").where("email", "==", email).get().then((querySnapshot: QuerySnapshot) => {
        if (querySnapshot.empty) {
            response.status(404).send({ message: "Usuario no encontrado"});
        } else {
            const userData = querySnapshot.docs[0].data();
            const userId = querySnapshot.docs[0].id;

            const token = generateToken({ email: userData.email, id: userId });

        
            response.status(200).send({ token: token });
        }
    }).catch((error) => {
        response.status(500).send({ message: "Error al buscar el email"});
    });
};

