import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

 async create(dto: CreateUserDto) : Promise<User> {
    console.log("----------USer dto",dto)
    const createdUser = new this.userModel(dto);
    let user = await createdUser.save();
    return user.toObject({ getters: true, virtuals: true });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string) {
    console.log('email',email);
    return this.userModel.findOne({ email }).lean();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
