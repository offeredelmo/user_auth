import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/users/enums/rol.enum';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { Roles } from './decorators/roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
    private readonly configService: ConfigService
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email)
    const comparePassword = await bcrypt.compare(loginDto.password, user.password) //evaluar contraseña
    if (comparePassword) {
      const tokens = await this.getTokens(user._id, user.email, user.roles)//obtener token

      await this.usersService.updateRefreshToken(user.id, tokens.refreshToken)// guardar el refrsh token

      return {
        name: (user.name),
        email: user.email,
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }

    } else {
      throw new UnauthorizedException(`contraseña no valida`)
    }
  }

  async register(registerDto: RegisterDto) {
    return await this.usersService.create(registerDto)
  }

  //genera un codigo de 7 digitos que manda al correo para validarlo despues al recuperar la contraseña
  async sendRecoveryCodeEmail(email: string) {

    await this.usersService.findByEmail(email)

    const code = randomBytes(7).toString('hex').substring(0, 7);

    const responseEmail = await this.nodemailerService.sendEmailByRecoverypassword(code, email)

    this.usersService.addVerificationCode(code, email)

    return responseEmail
  }

  //cambia la contraseña
  async recoveryPassword(email:string, password:string, verificationCode:string) {
    return await this.usersService.recoveryPassword(email, password, verificationCode)
  }

  //se obtienen refresh token y accestoken
  async getTokens(userId: string, email: string, roles: UserRole[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { 
          user: userId,
          sub: email,
          roles,
        },
        {
          secret: this.configService.get<string>('access_token'),
          expiresIn: '24h',
        },
      ),
      this.jwtService.signAsync(
        {
          user: userId,
          sub: email,
          roles,
        },
        {
          secret: this.configService.get<string>('refresh_token'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  //refrescar tokens 
  async refreshTokens(userId: string, refreshToken: string) {

    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare( //verifica que el token encriptado sea igual al recibido
      refreshToken,
      user.refreshToken
    );
    
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user._id, user.id, user.roles);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }



}
