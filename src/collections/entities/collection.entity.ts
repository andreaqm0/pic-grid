import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { PictureCollection } from 'src/db/many-to-many/picture-collection.table';
import { Picture } from 'src/pictures/entities/picture.entity';
import { User } from 'src/users/entities/user.entity';

export class Collection extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    allowNull: false,
  })
  uid: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
      maxLength: 100,
    },
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  owner_id: string;

  @BelongsTo(() => User)
  owner: User;

  @BelongsToMany(() => Picture, () => PictureCollection)
  pictures: Picture[];

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
