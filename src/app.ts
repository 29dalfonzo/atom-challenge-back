import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import tasksRouter from "./routes/tasks";

export const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(usersRouter);
app.use(tasksRouter);



module.exports = {app };

