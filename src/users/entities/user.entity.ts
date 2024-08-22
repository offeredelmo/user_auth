import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole } from "../enums/rol.enum";





@Schema({timestamps: true})
export class User {

  _id: string;

  @Prop({required: true})
  name: string;

  @Prop({required:true, unique:true})
  email: string;

  @Prop({required:true})
  password: string;

  @Prop({ type: [String], enum: UserRole })
  roles: UserRole[];

  @Prop()
  verificationCode: string

  @Prop()
  verificationCodeExpires: Date

  @Prop()
  refreshToken: string;

  @Prop({default:false})
  delete: boolean

  @Prop()
  deletedAt?: Date;
}


export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

