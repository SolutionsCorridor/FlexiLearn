import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { S3ClientModule } from 'src/s3-client/s3-client.module';
import { AppointmentSchema } from './schemas/appointment.schema';
import { StudentSchema } from 'src/student/schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Student',
        schema: StudentSchema
      },
      {
        name: 'Teacher',
        schema: AppointmentSchema
      },
      {
        name: 'Appointment',
        schema: AppointmentSchema
      },
    ]),
    S3ClientModule,
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [AppointmentService]
})
export class MeetingModule { }
