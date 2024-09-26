import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Collection } from 'src/collections/entities/collection.entity';
import { Picture } from 'src/pictures/entities/picture.entity';

@Table
export class PictureCollection extends Model {
  @ForeignKey(() => Picture)
  @Column
  pictureId: string;

  @ForeignKey(() => Collection)
  @Column
  collectionId: string;
}
