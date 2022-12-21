/** @package */
import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/schemas/user.schema';

/** @module */
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'You can register a new user',
  })
  @ApiBody({ type: RegisterAuthDto })
  @ApiOkResponse({
    description: 'User registered correctly',
    type: User,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @ApiOperation({
    summary: 'Login a new user',
    description: 'You can register a new user',
  })
  @ApiBody({ type: LoginAuthDto })
  @ApiOkResponse({
    description: 'User logged correctly',
    type: User,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
