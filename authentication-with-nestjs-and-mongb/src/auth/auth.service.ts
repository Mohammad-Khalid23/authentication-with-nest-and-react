import { Injectable, UnprocessableEntityException, UnauthorizedException, NotFoundException, HttpStatus } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth-dto';
import { SigninAuthDto } from './dto/signin-auth-dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ){}

 async signup(signupAuthDto: SignupAuthDto) {

  const userExist = await this.userService.findOne(signupAuthDto.email);
  
  if(userExist){
    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      error:  "User already exist with provided email,Please Login",
    });
  }
  
  const generatedSalt = await genSaltSync(10);

   const passwordHash = await hashSync(signupAuthDto.password, generatedSalt);

   signupAuthDto.password = passwordHash
   let createdUser = await this.userService.create(signupAuthDto);

   const hash = await this.jwtService.signAsync(
     createdUser,
    {
      secret: this.configService.getOrThrow('auth.secret', {
        infer: true,
      }),
      expiresIn: this.configService.getOrThrow('auth.expires', {
        infer: true,
      }),
    },
  );

   return {
     status: HttpStatus.OK,
     message: "Register successfully",
     data : {
       token: hash
     }
   };
 }

  async signin(signinAuthDto: SigninAuthDto) {

    const userExist = await this.userService.findOne(signinAuthDto.email);

    if (!userExist) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: "User not found,Please Register",
      });
    }


    const isPasswordMatched = await compareSync(signinAuthDto.password, userExist.password);


    if (!isPasswordMatched) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error:"Invalid password",
      });
    }
    const hash = await this.jwtService.signAsync(
      userExist,
      {
        secret: this.configService.getOrThrow('auth.secret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.expires', {
          infer: true,
        }),
      },
    );

    return {
      status: HttpStatus.OK,
      message: "Logged in successfully",
      data:{
        token: hash
      }
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
