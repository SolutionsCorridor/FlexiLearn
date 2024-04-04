import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Teacher } from 'src/teacher/schemas/teacher.schema';
import { Student } from 'src/student/schemas/student.schema';
import { Parent } from 'src/parent/schemas/parent.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Parent.name) private parentModel: Model<Parent>
  ) { }

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

  async findAll() {
    return await this.userModel.find().lean();
  }

  async findUserDetails(userId: string, role: string): Promise<any> {
    let userDetails = null;

    switch (role) {
      case 'teacher':
        userDetails = await this.teacherModel.findOne({ userId }).exec();
        break;
      case 'student':
        userDetails = await this.studentModel.findOne({ userId }).exec();
        break;
      case 'parent':
        userDetails = await this.parentModel.findOne({ userId }).exec();
        break;
      default:
        break;
    }

    return userDetails;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }

  async createAdmin(body: any) {
    const { email, password, role } = body;
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
      message: 'Admin created successfully',
    };
  }

  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id }).lean();
  }
}

