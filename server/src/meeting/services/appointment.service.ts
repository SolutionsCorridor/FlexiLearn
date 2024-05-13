import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3ClientService } from 'src/s3-client/s3-client.service';
import { Student } from 'src/student/schemas/student.schema';
import { Teacher } from 'src/teacher/schemas/teacher.schema';
import { Appointment } from '../schemas/appointment.schema';

@Injectable()
export class AppointmentService {

    constructor(
        @InjectModel(Appointment.name) private appointment: Model<Appointment>,
        @InjectModel(Student.name) private student: Model<Student>,
        @InjectModel(Teacher.name) private teacher: Model<Teacher>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    s3Client = this.s3ClientService.getS3Client();
    BUCKET_NAME = this.s3ClientService.getBucketName();

    folderName = 'user/appointment';

    createAppointment(data: { studentId: string; teacherId: string; date: string; time: string }) {
        try {
            const appointment = new this.appointment({
                studentId: data.studentId,
                teacherId: data.teacherId,
                date: data.date,
                time: data.time,
            });

            return appointment.save();
        } catch (error) {
            console.error("Error creating appointment:", error);
            throw error;
        }
    }

    getAppointments(data: { studentId: string; teacherId: string }) {
        try {
            return this.appointment.find({
                studentId: data.studentId,
                teacherId: data.teacherId
            });
        } catch (error) {
            console.error("Error getting appointments:", error);
            throw error;
        }
    }

}
