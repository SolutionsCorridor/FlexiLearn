import { Module } from '@nestjs/common';
import { TeacherController } from './controllers/teacher.controller';
import { TeacherService } from './services/teacher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { TeacherSchema } from './schemas/teacher.schema';
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
        ]),
        S3ClientModule,
    ],
    controllers: [TeacherController],
    providers: [TeacherService],
    exports: [TeacherService]
})
export class TeacherModule { }
