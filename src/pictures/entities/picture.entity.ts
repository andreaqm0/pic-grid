import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
} from 'sequelize-typescript';
import { Collection } from 'src/collections/entities/collection.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { PictureCollection } from 'src/db/many-to-many/picture-collection.table';
import { User } from 'src/users/entities/user.entity';

export class Picture extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
      maxLength: 100,
    },
  })
  name: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
      maxLength: 255,
    },
  })
  description: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  filePath: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  owner_id: string;

  @BelongsTo(() => User)
  owner: User;

  @BelongsToMany(() => Collection, () => PictureCollection)
  collections: Collection[];

  @HasMany(() => Comment)
  comments: Comment[];

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
