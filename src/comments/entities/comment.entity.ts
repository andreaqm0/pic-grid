import { CreationOptional } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Picture } from 'src/pictures/entities/picture.entity';
import { User } from 'src/users/entities/user.entity';
export class Comment extends Model {
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
    type: DataType.TEXT,
    validate: {
      notEmpty: true,
      maxLength: 500,
    },
  })
  comment: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  owner_id: string;

  @BelongsTo(() => User)
  owner: User;

  @ForeignKey(() => Picture)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  picture_id: string;

  @BelongsTo(() => Picture)
  picture: Picture;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
