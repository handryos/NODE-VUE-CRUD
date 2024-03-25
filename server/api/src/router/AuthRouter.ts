import BaseRoutes from "./base/BaseRouier";
import AuthController from "../controllers/AuthController";
import validate from "../validation/validate";
import { createNoteSchema } from "../schema/UserSchema";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/register",
      validate(createNoteSchema),
      AuthController.register
    );
    this.router.post(
      "/login",
      validate(createNoteSchema),
      AuthController.login
    );
  }
}

export default new AuthRoutes().router;
