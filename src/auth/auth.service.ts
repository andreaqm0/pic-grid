import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUser } from 'src/users/dto/update-user.dto';
import { CreateUser } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUser) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    try {
      return await this.usersService.create({
        ...user,
        password: hashedPassword,
      });
    } catch (error) {
      if (error.original.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'This email is already in use',
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const validCredentials = await bcrypt.compare(pass, user.password);
    if (!validCredentials) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.uid, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(uid: string) {
    const user = await this.usersService.findOneById(uid);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user.dataValues;
    return result;
  }

  async edit(uid: string, data: UpdateUser) {
    if (data.password) {
      const saltOrRounds = 10;
      data.password = await bcrypt.hash(data.password, saltOrRounds);
    }

    await this.usersService.update(uid, data);

    const user = await this.usersService.findOneById(uid);
    const { password, ...result } = user.dataValues;
    return result;
  }

  async delete(uid: string) {
    await this.usersService.remove(uid);
  }
}
