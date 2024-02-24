import { Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';
import { DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { Student } from '../schemas/student.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { StudentProfile } from '../schemas/student-profile.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';
import { BUCKET_NAME } from 'src/config/config';

@Injectable()
export class StudentService {

    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Student.name) private student: Model<Student>,
        @InjectModel(StudentProfile.name) private studentProfile: Model<StudentProfile>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    s3Client = this.s3ClientService.getS3Client();

    async getStudents() {
        const students = await this.student.find().lean();
        return students;
    }

    async getStudent(studentId: string) {
        const student = await this.student.findById(studentId).lean();
        return student;
    }

    async createStudent(data: CreateStudentDto) {
        const { studentId } = data;
        const student = await this.student.create({ studentId });
        return student;
    }

    // async updateStudent(studentId: string, data: UpdateStudentDto) {
    //     const { qualification, status, experience } = data;
    //     const student = await this.prisma.getPrismaClient().student.update({
    //         where: { id: studentId },
    //         data: {
    //             qualification,
    //             status,
    //             experience,
    //         },
    //     });
    //     return student;
    // }

    async deleteStudent(studentId: string) {
        try {
            await this.studentProfile.deleteOne({ studentId });

            const student = await this.student.deleteOne({ studentId });

            await this.user.deleteOne({ userId: studentId });

            const listParams = {
                Bucket: BUCKET_NAME,
                Prefix: `student/profile/${studentId}`,
            };

            const listObjectsResponse = await this.s3Client.send(new ListObjectsV2Command(listParams));

            console.log('listObjectsResponse', listObjectsResponse);

            const deletePromises = listObjectsResponse.Contents.map(async (object) => {
                const deleteParams = {
                    Bucket: BUCKET_NAME,
                    Key: object.Key,
                };
                await this.s3Client.send(new DeleteObjectCommand(deleteParams));
            });

            // Wait for all delete operations to complete
            await Promise.all(deletePromises);

            console.log('Objects deleted successfully.');
            return student;

        } catch (error) {
            console.error('An error occurred:', error);
            return error;
        }
    }

}
