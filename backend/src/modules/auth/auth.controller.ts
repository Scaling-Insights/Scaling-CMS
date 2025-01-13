import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginCredentialsDto.email, loginCredentialsDto.password);
  }
}