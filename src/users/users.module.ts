import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Models } from 'src/db/models.db';

@Module({
  controllers: [],
  imports: [SequelizeModule.forFeature(Models)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
