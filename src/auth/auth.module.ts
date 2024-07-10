import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/jwt.constant';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    NodemailerModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
})
export class AuthModule {}
