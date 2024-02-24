import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { StudentProfileController } from './controllers/student-profile.controller';
import { StudentProfileService } from './services/student-profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { StudentSchema } from './schemas/student.schema';
import { StudentProfileSchema } from './schemas/student-profile.schema';
import { S3ClientModule } from 'src/s3-client/s3-client.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            },
            {
                name: 'Student',
                schema: StudentSchema
            },
            {
                name: 'StudentProfile',
                schema: StudentProfileSchema
            },
        ]),
        S3ClientModule,
    ],
    controllers: [StudentController, StudentProfileController],
    providers: [StudentService, StudentProfileService],
    exports: [StudentService, StudentProfileService]
})
export class StudentModule { }
