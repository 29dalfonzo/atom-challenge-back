import express from "express";
import cors from "cors";
import allRoutes from "./routes/routes";
import router from "./routes/index";

 const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router); // Usa el router importado


export { app };