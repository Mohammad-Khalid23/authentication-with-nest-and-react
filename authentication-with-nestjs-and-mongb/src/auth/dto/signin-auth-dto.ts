import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class SigninAuthDto {
    @Transform(lowerCaseTransformer)
    @IsEmail()
    email: string;
  
    @MinLength(6)
    password: string;
}
