import "express-async-errors";
import express, { Request, Response, Application } from "express";
import cors from "cors";
import Database from "./db";
import AuthRoutes from "./router/AuthRouter";
import AppRoutes from "./router/AppRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.redirect("/login");
    });
    this.app.use("/users/", AuthRoutes);
    this.app.use("/services/", AppRoutes);
  }
}

const app = new App().app;

const PORT: number = 8000;

app.listen(PORT, () => {
  console.log("✅ Server iniciado");
});
