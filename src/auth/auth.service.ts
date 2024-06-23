import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ){}
 
  async login(loginDto:LoginDto){
    const user = await this.usersService.findByEmail(loginDto.email)
    const comparePassword = await bcrypt.compare(loginDto.password, user.password)
    if (comparePassword) {
      const payload = {email: user.email, roles: user.roles}
      return {
        name: user.name,
        email: user.email,
        token: await this.jwtService.signAsync(payload)
      }
    }else{
      throw new UnauthorizedException(`contraseña no valida`)
    }
    // falta colocar alguna respuesta de error
  }

  async register(registerDto:RegisterDto){
    return await this.usersService.create(registerDto)
  }

  async recoveryPasswordByEmail(){

  }

}
