import { getUser } from "../../controllers/users/getUser";
import { Router } from "express";

export const getUserRouter = (routes: Router) => {
    routes.get("/users/:email", getUser);
}

