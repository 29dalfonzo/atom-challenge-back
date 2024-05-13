import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { app } from "./app";

// configures dotenv to work in your application
dotenv.config();

const PORT = process.env.PORT;


let server = app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});

function closeServer() {
  return new Promise((resolve, reject) => {
    if (!server.listening) {
      resolve(true);
    } else {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    }
  });
}

function validateServer() {
  return server;
}

export { server, closeServer, validateServer };


