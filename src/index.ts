import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { app } from "./app";

// configures dotenv to work in your application
dotenv.config();

const PORT = process.env.PORT;


app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});

export { app };