import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class RegisterAuthDto {
    @Transform(lowerCaseTransformer)
    @IsEmail()
    email: string;
  
    @MinLength(6)
    password: string;
  
    @IsNotEmpty()
    name: string;
}
