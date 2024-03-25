import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Cliente } from "./Cliente";
import { FormaPagamento } from "./FormaPagamento";

@Table({
  tableName: "vendas",
  timestamps: true,
})
export class Venda extends Model<Venda> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id!: number;

  @ForeignKey(() => Cliente)
  @Column({
    field: "clienteId",
    allowNull: false,
    onDelete: "CASCADE",
  })
  clienteId!: number;

  @BelongsTo(() => Cliente)
  cliente!: Cliente;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: "total",
    allowNull: false,
  })
  total!: number;

  @Column({
    type: DataType.JSONB,
    field: "produtos",
    allowNull: false,
  })
  produtos!: { codigo: number; quantidade: number }[];

  @ForeignKey(() => FormaPagamento)
  @Column({
    field: "formaPagamentoId",
    allowNull: false,
    onDelete: "CASCADE",
  })
  formaPagamentoId!: number;

  @BelongsTo(() => FormaPagamento)
  formaPagamento!: FormaPagamento;
}
