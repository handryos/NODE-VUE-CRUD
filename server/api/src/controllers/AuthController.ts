import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { AuthRepo } from "../repository/AuthRepo";
import sigIn from "../session/sigIn";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Authentication } from "../session/Authentication/Authentication";

type JwtPayload = {
  name: string;
};

class AuthControler {
  async register(req: Request, res: Response) {
    try {
      const new_user = new User();
      new_user.name = req.body.name;
      new_user.password = await bcrypt.hash(req.body.password, 12);
      await new AuthRepo().save(new_user);

      res.status(200).json({
        status: "Sucesso!",
        message: "Usuário Cadastrado com Sucesso!",
        user: new_user.name,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: err.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = new User();
      user.name = req.body.name;
      user.password = req.body.password;

      const token = sigIn(user.toJSON());

      await new AuthRepo().login(user);

      res.status(200).json({
        user: user.name,
        token: token,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: err.message,
        user: {
          name: req.body.name,
        },
      });
    }
  }

  async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        status: "Unauthorized!",
        message: "Token não fornecido!",
      });
      throw new Error("401, Unauthorized");
    }
    console.log(authorization);
    const token = authorization.split(" ")[1];

    try {
      const { name } = jwt.verify(
        token,
        Authentication.jwtSecret
      ) as JwtPayload;

      let user = await User.findOne({
        where: {
          name: name,
        },
      });
      if (!user) {
        throw new Error("401, Unauthorized");
      }
      next();
    } catch (err: any) {
      res.status(401).json({
        status: "Unauthorized!",
        message: "Invalid token!",
      });
    }
  }
}
export default new AuthControler();
