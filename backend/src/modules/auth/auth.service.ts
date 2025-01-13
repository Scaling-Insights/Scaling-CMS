import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UsersService } from '../users/users.service';
import { InvalidLoginCredentialsException } from 'src/common/exceptions/auth/invalid-login-credentials.exception';
import { User } from 'src/shared/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const user = new User();
    user.id = 7265738540758077449n;
    user.username = 'Peterpan';
    user.email = 'Peter@pan.nl';
    user.password = 'peterpan123';

    // remove the toSting() method, when the user is fetched from the database!!
    const payload = { sub: user.id.toString(), username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
