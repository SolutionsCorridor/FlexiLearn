import { Injectable } from '@nestjs/common';
import { CreateTeacherDto, UpdateTeacherDto } from '../dto/teacher.dto';
import { DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../schemas/teacher.schema';
import { TeacherProfile } from '../schemas/teacher-profile.schema';
import { User } from 'src/user/schemas/user.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Teacher.name) private teacher: Model<Teacher>,
        @InjectModel(TeacherProfile.name) private teacherProfile: Model<TeacherProfile>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    s3Client = this.s3ClientService.getS3Client();
    BUCKET_NAME = this.s3ClientService.getBucketName();

    async getTeachers() {
        const teachers = await this.teacher.find().lean();
        return teachers;
    }

    async getTeacher(teacherId: string) {
        const teacher = await this.teacher.findOne({ teacherId }).lean();
        return teacher;
    }

    async createTeacher(data: CreateTeacherDto) {
        const { teacherId, qualification, status, experience } = data;
        const teacher = await this.teacher.create({
            teacherId,
            qualification,
            status,
            experience,
        });
        return teacher;
    }

    async updateTeacher(teacherId: string, data: UpdateTeacherDto) {
        const { qualification, status, experience } = data;
        const teacher = await this.teacher.findOneAndUpdate(
            { teacherId },
            {
                qualification,
                status,
                experience,
            },
            { new: true }
        );
        return teacher;
    }

    async deleteTeacher(teacherId: string) {
        try {
            await this.teacherProfile.deleteOne({ teacherId });

            const teacher = await this.teacher.deleteOne({ teacherId });

            await this.user.deleteOne({ userId: teacherId });

            const listParams = {
                Bucket: this.BUCKET_NAME,
                Prefix: `teacher/profile/${teacherId}`,
            };

            const listObjectsResponse = await this.s3Client.send(new ListObjectsV2Command(listParams));

            console.log('listObjectsResponse', listObjectsResponse);

            const deletePromises = listObjectsResponse.Contents.map(async (object) => {
                const deleteParams = {
                    Bucket: this.BUCKET_NAME,
                    Key: object.Key,
                };
                await this.s3Client.send(new DeleteObjectCommand(deleteParams));
            });

            // Wait for all delete operations to complete
            await Promise.all(deletePromises);

            console.log('Objects deleted successfully.');
            return teacher;

        } catch (error) {
            console.error('An error occurred:', error);
            return error;
        }
    }


}
