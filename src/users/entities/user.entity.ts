import { CreationOptional } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Collection } from 'src/collections/entities/collection.entity';
import { Picture } from 'src/pictures/entities/picture.entity';

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

  @HasMany(() => Picture)
  pictures: Picture[];

  @HasMany(() => Collection)
  collections: Collection[];

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
