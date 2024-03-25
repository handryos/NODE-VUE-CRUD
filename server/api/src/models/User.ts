import { Model, Table, Column, DataType, BeforeCreate } from "sequelize-typescript";
import bcrypt from 'bcrypt';


@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = "user" as string;
  public static USER_ID = "id" as string;
  public static USER_NAME = "name" as string;
  public static USER_PASSWORD = "password" as string;
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(200),
    field: User.USER_PASSWORD,
  })
  password!: string;

  public static hashPassword(user: User): Promise<void> {
    const SALT_FACTOR = 8;

    if (!user.changed('password')) {
        return Promise.resolve();
    }

    return bcrypt
        .genSalt(SALT_FACTOR)
        .then((salt: string) => bcrypt.hash(user.password, salt))
        .then((hash: string) => {
            user.setDataValue('password', hash);
        });
};
}