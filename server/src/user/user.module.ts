import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
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
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
