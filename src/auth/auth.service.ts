import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/database/PrismaService';
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken";

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService){}

  async Login(data : LoginAuthDto) {
    const user = await this.prisma.user.findFirst({ 
      where: {
        user : data.user
      } 
    });
    if (!user) {
      throw new Error("USI");
    }

    //validando a senha
    const match = await compare(data.password, user.passwordHash);
    if (!match) {
      throw new Error("USI");
    }

    return { userId: user.id };
  }
  async GenerateToken(data: string) {
    //gerando token e salvando-o
    const token = sign({}, process.env.TOKEN_SECRET, {
      subject: `${data}`,
      expiresIn: "1d",
    });

    return token;
  }
  async GenerateRefreshToken (data) {
    //cadastrando user
    const newRefreshToken = await this.prisma.refreshToken.create({
      data:{
        userId: data.userId,
        expiresIn: data.expiresIn,
      }
    });

    return newRefreshToken.id;
  }
  async RefreshToken(data) {
    //validando o token
    const refreshToken = await this.prisma.refreshToken.findUnique(data);
    if (!refreshToken) {
      throw new Error("TI");
    }

    return { userId: refreshToken.userId};
  }
  async DeleteRefreshToken(data) {
    //deletando o token
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId: data.userId
      }})

    return;
  }
}
