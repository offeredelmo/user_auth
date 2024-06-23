import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { Role } from './enums/rol.enum';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto)
      newUser.password = await bcrypt.hash(createUserDto.password, 10)
      newUser.roles.push(Role.USER)
      await newUser.save()
      return newUser;
    } catch (error) {
      if (error.code == 11000) {
        throw new BadRequestException(`El correo ${createUserDto.email} ya esta registrado`)
      }
      throw new InternalServerErrorException("a ocurrido un error inesperado, intente mas tarde")
    }

  }

  async findByEmail(email) {
    const userSerch = await this.userModel.findOne({ email: email })
    if (!userSerch) {
      throw new UnauthorizedException(`el usuario con el email ${email} no fue encontrado`)
    }
    return userSerch;
  }

  async remove(_id: string) {
    const removeUser = await this.userModel.findOneAndUpdate(
      { _id },
      { $set: { delete: true } },
      { new: true }
    )

    if (!removeUser) {
      throw new NotFoundException(`el usuario con el id ${_id} no fue encontrado`)
    }

    return `el usuario con el id ${_id} no fue encontrado`;
  }
}
