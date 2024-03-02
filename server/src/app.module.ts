import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ParentModule } from './parent/parent.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { S3ClientModule } from './s3-client/s3-client.module';
import { QuizModule } from './quiz/quiz.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DATABASE_URL),

    UserModule,
    AuthModule,
    TeacherModule,
    StudentModule,
    ParentModule,
    S3ClientModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
