import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { TeacherSchema } from 'src/teacher/schemas/teacher.schema';
import { StudentSchema } from 'src/student/schemas/student.schema';
import { ParentSchema } from 'src/parent/schemas/parent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      },
      {
        name: 'Teacher',
        schema: TeacherSchema
      },
      {
        name: 'Student',
        schema: StudentSchema
      },
      {
        name: 'Parent',
        schema: ParentSchema
      }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
})
export class AuthModule { }
