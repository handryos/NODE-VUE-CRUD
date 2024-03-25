import jwt from "jsonwebtoken";
import { Authentication } from "./Authentication/Authentication";
import { User } from "../models/User";

export default function (User: User) {
  console.log(User);
  return jwt.sign(User, Authentication.jwtSecret, {
    expiresIn: "8h",
  });
}
