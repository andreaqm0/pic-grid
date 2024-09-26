import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Get('me')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }

  @Patch('me')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.edit(req.user.sub, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  delete(@Request() req) {
    return this.authService.delete(req.user.sub);
  }
}
