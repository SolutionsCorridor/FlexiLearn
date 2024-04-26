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

  async findAll(skip: number, limit: number, query: string) {
    let usersQuery = this.userModel.find();

    // Apply search query if provided
    if (query) {
      usersQuery = usersQuery.find({
        $or: [
          { email: { $regex: query, $options: 'i' } },
          { role: { $regex: query, $options: 'i' } },
          { status: { $regex: query, $options: 'i' } },
        ],
      });
    }

    // Apply pagination
    usersQuery = usersQuery.skip(skip).limit(limit);

    // Execute the query to get users
    const users = await usersQuery.lean();

    // Manually construct the response with userDetails from related tables
    const response = await Promise.all(users.map(async (user) => {
        // Fetch fullName and profileImage from related tables based on user's role
        let fullName, profileImage;
        switch (user.role) {
            case 'teacher':
                const teacher = await this.teacherModel.findOne({ userId: user._id }).lean();
                fullName = teacher.fullName;
                profileImage = teacher.profileImage;
                break;
            case 'parent':
                const parent = await this.parentModel.findOne({ userId: user._id }).lean();
                fullName = parent.fullName;
                profileImage = parent.profileImage;
                break;
            case 'student':
                const student = await this.studentModel.findOne({ userId: user._id }).lean();
                fullName = student.fullName;
                profileImage = student.profileImage;
                break;
            default:
                fullName = '';
                profileImage = '';
        }
        return { ...user, userDetails: { fullName, profileImage } };
    }));

    // Exclude password field from the response
    response.forEach(user => delete user.password);

    return response;
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

  async changeStatus(id: string, status: string) {
    return await this.userModel.findByIdAndUpdate(id, { status }, { new: true });
  }

}

