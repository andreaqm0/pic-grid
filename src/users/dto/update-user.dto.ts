import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export interface UpdateUser {
  fullname?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}
