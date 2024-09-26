import { Collection } from 'src/collections/entities/collection.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { User } from 'src/users/entities/user.entity';
import { PictureCollection } from './many-to-many/picture-collection.table';

export const Models = [User, Picture, Collection, Comment, PictureCollection];
