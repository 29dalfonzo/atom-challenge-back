import express from "express";
import cors from "cors";
import allRoutes from "./routes/routes";
import { db } from "./firebase";

 const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes);

app.get("/", async (request, response) => {
    db.collection("usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
        response.status(200).send(querySnapshot.docs.map((doc) => doc.data()));
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        response.status(500).send("Error getting documents");
    });
});


export { app };