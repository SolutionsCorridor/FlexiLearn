import { Module } from '@nestjs/common';
import { TeacherProfileController } from './controllers/teacher-profile.controller';
import { TeacherController } from './controllers/teacher.controller';
import { TeacherService } from './services/teacher.service';
import { TeacherProfileService } from './services/teacher-profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { TeacherSchema } from './schemas/teacher.schema';
import { TeacherProfileSchema } from './schemas/teacher-profile.schema';
import { S3ClientModule } from 'src/s3-client/s3-client.module';

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
                name: 'TeacherProfile',
                schema: TeacherProfileSchema
            },
        ]),
        S3ClientModule,
    ],
    controllers: [TeacherController, TeacherProfileController],
    providers: [TeacherService, TeacherProfileService],
    exports: [TeacherService, TeacherProfileService]
})
export class TeacherModule { }
