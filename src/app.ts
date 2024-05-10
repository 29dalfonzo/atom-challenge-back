import express from "express";
import cors from "cors";
import allRoutes from "./routes/routes";
import usersRouter from "./routes/users";
import tasksRouter from "./routes/tasks";

 const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(usersRouter); // Usa el router importado
app.use(tasksRouter); // Usa el router importado



export { app };