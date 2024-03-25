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
  tableName: "formaPagamento",
})
export class FormaPagamento extends Model {
  public static PAYMENT_TYPE_ID = "id" as string;
  public static PAYMENT_TYPE_NAME = "nome" as string;
  public static PAYMENT_TYPE_PARCELAS = "parcelas" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: FormaPagamento.PAYMENT_TYPE_ID,
  })
  id!: number;

  @ForeignKey(() => Venda)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  vendaId!: number;

  @BelongsTo(() => Venda)
  venda!: Venda;

  @Column({
    type: DataType.STRING(100),
    field: FormaPagamento.PAYMENT_TYPE_NAME,
    allowNull: false,
    unique: true,
  })
  nome!: string;

  @Column({
    type: DataType.INTEGER,
    field: FormaPagamento.PAYMENT_TYPE_PARCELAS,
  })
  parcelas!: number;
}
