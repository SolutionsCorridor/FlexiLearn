import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private JwtService: JwtService) { }

  async create(dto: CreateUserDto) {
    const { email, password, role } = dto;
    const hashedPassword = await hash(password, 10);

    const userExists = await this.userModel.exists({ email });
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }


    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      role,
      status: "registered",
    });


    return {
      user,
      message: 'User created successfully',
    };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }
}

