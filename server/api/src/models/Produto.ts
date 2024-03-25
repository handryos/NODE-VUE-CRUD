import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Venda } from "./Venda";

@Table({
  tableName: "produto",
})
export class Produto extends Model {
  public static PRODUCT_ID = "id" as string;
  public static PRODUCT_NAME = "nome" as string;
  public static PRODUCT_QUANTIDADE = "quantidade" as string;
  public static PRODUCT_PRECO = "preco" as string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: Produto.PRODUCT_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Produto.PRODUCT_NAME,
    allowNull: false,
    unique: true,
  })
  nome!: string;

  @Column({
    type: DataType.FLOAT,
    field: Produto.PRODUCT_QUANTIDADE,
    allowNull: false,
  })
  quantidade!: number;

  @Column({
    type: DataType.FLOAT,
    field: Produto.PRODUCT_PRECO,
    allowNull: false,
  })
  preco!: number;
}
