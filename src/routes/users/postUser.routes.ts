import { Router } from "express";
import postUser from "../../controllers/users/postUser";



export const postUserRouter =(routes:Router) => {
    routes.post("/users", postUser);
}

