import { Injectable, UnprocessableEntityException, UnauthorizedException, NotFoundException, HttpStatus } from '@nestjs/common';
import { RegisterAuthDto } from './dto/resgister-auth-dto';
import { LoginAuthDto } from './dto/login-auth-dto';
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

 async register(resgiterAuthDto: RegisterAuthDto) {
    console.log('------------resgiterAuthDto',resgiterAuthDto)

  const userExist = await this.userService.findOne(resgiterAuthDto.email);
  
  if(userExist){
    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: {
        message: "User already exist with provided email,Please Login",
      },
    });
  }
  
  const generatedSalt = await genSaltSync(10);

   const passwordHash = await hashSync(resgiterAuthDto.password, generatedSalt);
   console.log("--------generated salt", generatedSalt)
   console.log('--------password hash', passwordHash);

   resgiterAuthDto.password = passwordHash
   await this.userService.create(resgiterAuthDto);

   return {
     status: true,
     message: "Register successfully",
   };
 }

  async login(loginAuthDto: LoginAuthDto) {
    console.log('------------loginAuthDto', loginAuthDto)

    const userExist = await this.userService.findOne(loginAuthDto.email);

    if (!userExist) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          message: "User not found,Please Register",
        },
      });
    }


    const isPasswordMatched = await compareSync(loginAuthDto.password, userExist.password);
    console.log("--------isPasswordMatched", isPasswordMatched)


    if (!isPasswordMatched) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        errors: {
          message: "Invalid password",
        },
      });
    }
console.log("----------userExist",userExist)
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
    console.log('-------------token----------', hash)
    // await this.userService.create(loginAuthDto);

    return {
      status: true,
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
