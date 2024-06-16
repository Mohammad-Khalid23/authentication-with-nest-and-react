import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class SignupAuthDto {
    @Transform(lowerCaseTransformer)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
  
    @MinLength(8)
    password: string;
}
