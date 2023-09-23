import {  PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from "./create-user.dto";
import { IsUUID, IsNotEmpty } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsUUID()
    @IsNotEmpty()
    userId : string;
}
