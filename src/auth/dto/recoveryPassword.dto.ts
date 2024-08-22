import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class RecoveryPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    verificationCode:string
}