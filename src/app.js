// Middleware and routes file

import express from "express";
import main from "./fetchData.js";
import validateInput from "./validateInput.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", (req, res, next) => {
  validateInput(req, res, next);
});

// GET request for root page ("/")
app.get("/", async (req, res) => {
  await main(req, res);
});

export { app };
