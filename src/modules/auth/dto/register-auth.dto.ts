/** @package */
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

/** @module */
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  name: string;
}
