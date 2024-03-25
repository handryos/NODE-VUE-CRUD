import express, { Request, Response } from "express";
const AuthController = require("./controllers/AuthController");

module.exports = (app: express.Express) => {
  app.post("/register", AuthController.register);
};
module.exports = (app: express.Express) => {
  app.post("/login", AuthController.login);
};
