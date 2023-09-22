import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly user : string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password : string;
}
