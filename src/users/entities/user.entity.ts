import { CreationOptional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    allowNull: false,
  })
  uid: string;

  @Column({
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  })
  email: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 8,
    },
  })
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ allowNull: false, validate: { notEmpty: true } })
  fullname: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
