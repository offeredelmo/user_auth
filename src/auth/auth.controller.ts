import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/guard.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/users/enums/rol.enum';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto)
  }

  @Post("register")
  async register(@Body() registerDto:RegisterDto){
     return await this.authService.register(registerDto)

  }

  @Post()
  async recoveryPasswordByEmail (){
    return this.recoveryPasswordByEmail()
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async test(){
    return "test"
  }

}
