import { User } from "../models/User";
import bcrypt from "bcrypt";

interface IUserRepo {
  save(user: User): Promise<void>;
}

export class AuthRepo implements IUserRepo {
  async save(user: User): Promise<void> {
    try {
      User.hashPassword(user);
      await User.create({
        name: user.name,
        password: user.password,
      });
    } catch (error: any) {
      throw new Error(
        "Falha ao criar o usuário!" +
          error.message.replace(
            'duplicar valor da chave viola a restrição de unicidade "user_unique"',
            " Usuário já cadastrado"
          )
      );
    }
  }

  async login(user: User): Promise<void> {
    try {
      let registeredUser = await User.findOne({
        where: {
          name: user.name,
        },
      });
      if (!registeredUser) {
        throw new Error("Usuário não cadastrado! Verifique.");
      }
      let correctPassword = bcrypt.compareSync(
        user.password,
        registeredUser.password
      );
      if (!correctPassword) {
        throw new Error("Usuário ou senha inválidos! Verifique.");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
