import express from "express";
// import userRoutes from "./routes/index";
import router from "./routes/index";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router); // Usa el router importado


module.exports = {app };

