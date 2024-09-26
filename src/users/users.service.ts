import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUser } from './dto/update-user.dto';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(newUser: CreateUser) {
    await this.userModel.create({ ...newUser });
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async findOneById(uid: string) {
    return await this.userModel.findOne({ where: { uid } });
  }

  async update(uid: string, newData: UpdateUser) {
    return await this.userModel.update({ ...newData }, { where: { uid } });
  }

  async remove(uid: string) {
    await this.userModel.destroy({ where: { uid } });
  }
}
