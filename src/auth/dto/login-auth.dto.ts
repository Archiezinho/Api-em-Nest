import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsString()
    @IsNotEmpty()
    readonly user : string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password : string;
    
    passwordHash : string;
}
