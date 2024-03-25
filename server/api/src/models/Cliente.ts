import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Venda } from "./Venda";

@Table({
  tableName: "cliente",
})
export class Cliente extends Model {
  public static CLIENT_ID = "id" as string;
  public static CLIENT_NAME = "nome" as string;
  public static CLIENT_CPF = "cpf" as string;
  public static CLIENT_ENDERECO = "endereco" as string;
  public static CLIENT_EMAIL = "email" as string;
  public static CLIENT_CEP = "cep" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Cliente.CLIENT_ID,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: "nome",
    allowNull: false,
    unique: true,
  })
  nome!: string;

  @Column({
    type: DataType.STRING(11),
    field: "cpf",
    allowNull: false,
    unique: true,
  })
  cpf!: string;

  @Column({
    type: DataType.JSON,
    field: "endereco",
    allowNull: false,
  })
  endereco!: {};

  @Column({
    type: DataType.STRING(46),
    field: "email",
    allowNull: false,
  })
  email!: string;
}
