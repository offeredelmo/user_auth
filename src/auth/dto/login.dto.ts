import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";



export class LoginDto {

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    phone_number?: string;

    @IsNotEmpty()
    // @Transform(({value}) => (value.trim()))
    @IsString()
    password: string;
}