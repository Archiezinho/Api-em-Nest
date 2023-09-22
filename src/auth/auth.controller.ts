import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
const dayjs = require("dayjs");

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authentication(@Body() data: LoginAuthDto) {
    const authenticatedUser = await this.authService.Login(data);

    //mandando o userId para deletar o refreshToken antigo
    await this.authService.DeleteRefreshToken(authenticatedUser.userId);

    //gerando o expiresIn do refreshToken
    const expiresIn = dayjs().add(30, 'days').unix();

    //adicionando as informações necessarias para cadastrar o refreshToken
    let user = {
      userId: authenticatedUser.userId,
      expiresIn,
    };

    //Gerando o RefreshToken
    const refreshToken = await this.authService.GenerateRefreshToken(user);

    //mandando o id do user para gerar um token
    const setToken = await this.authService.GenerateToken(
      authenticatedUser.userId,
    );

    return { token: setToken, refreshToken: refreshToken };
  }
}
