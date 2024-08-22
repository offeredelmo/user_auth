import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { UserRole } from 'src/users/enums/rol.enum';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { IsEmail } from 'class-validator';
import { EmailValidationPipe } from './pipes/email_validation.pipe';
import { RefreshTokenGuard } from './guard/refreshToken.guard';
import { RecoveryPasswordDto } from './dto/recoveryPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto)
  }

  @Post("email-recovery-password")
  async sendRecoveryCodeEmail(@Body('email', EmailValidationPipe) email: string) {
    return this.authService.sendRecoveryCodeEmail(email)
  }

  @Post("recovery_password")
  async recoveryPasswordByEmail(@Body() recoveryPasswordDto:RecoveryPasswordDto ) {
    const {email, password, verificationCode} = recoveryPasswordDto
    return await this.authService.recoveryPassword(email, password, verificationCode)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    console.log(req)
    const userId = req['user'].dataToken.user;
    const refreshToken = req['user'].refreshtoken;
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async test() {
    return "test"
  }

}
