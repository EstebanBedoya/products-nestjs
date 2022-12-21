/** @package */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt/dist';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

/** @module */
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

/** @application */
import { User, UserDocument } from '../../common/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userDocument: Model<UserDocument>,
    private jwtAuthService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainToHash = await hash(password, 10);
    registerAuthDto = { ...registerAuthDto, password: plainToHash };

    return this.userDocument.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userDocument.findOne({ email });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new HttpException('Invalid password', 403);
    }

    const payload = { id: user._id, name: user.name, email: user.email };
    const token = this.jwtAuthService.sign(payload);

    const data = {
      user,
      token,
    };

    return data;
  }
}
