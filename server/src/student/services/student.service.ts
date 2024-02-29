import { Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto';
import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Student } from '../schemas/student.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';
import { BUCKET_NAME } from 'src/config/config';
import { base64ToBuffer, getImageExtension } from 'src/utils/common';

@Injectable()
export class StudentService {

    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Student.name) private student: Model<Student>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    s3Client = this.s3ClientService.getS3Client();
    BUCKET_NAME = this.s3ClientService.getBucketName();

    folderName = 'student/profile';

    async getStudents() {
        const students = await this.student.find().lean();
        return students;
    }

    async getStudent(studentId: string) {
        const student = await this.student.findOne({ userId: studentId }).lean();
        return student;
    }

    async createStudent(data: CreateStudentDto) {
        const { studentId, profileImage, ...restData } = data;

        const imgExtension = getImageExtension(profileImage);
        const imageBuffer = base64ToBuffer(profileImage);

        const imageKey = `${this.folderName}/${studentId}.${imgExtension}`;

        const params: PutObjectCommandInput = {
            Bucket: this.BUCKET_NAME,
            Key: imageKey,
            Body: imageBuffer,
            ACL: 'public-read',
            ContentType: `image/${imgExtension}`,
        };

        await this.s3Client.send(new PutObjectCommand(params));

        const imageUrl = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;


        const student = await this.student.create(
            {
                userId: studentId,
                ...restData,
                profileImage: imageUrl,
            }
        );
        return student;
    }

    async updateStudent(studentId: string, data: UpdateStudentDto) {
        const { profileImage, dob, language, gender } = data;

        console.log('data', data);

        let imageUrl = '';

        if (profileImage && !profileImage.startsWith('https://')) {
            const imgExtension = getImageExtension(profileImage);
            const imageBuffer = base64ToBuffer(profileImage);
            const imageKey = `${this.folderName}/${studentId}.${imgExtension}`;

            const params: PutObjectCommandInput = {
                Bucket: this.BUCKET_NAME,
                Key: `${imageKey}`,
                Body: imageBuffer,
                ACL: 'public-read',
                ContentType: `image/${imgExtension}`,
            };

            const uploadParams = new PutObjectCommand(params);
            await this.s3Client.send(uploadParams);
            imageUrl = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;

            console.log('Image uploaded successfully.', imageUrl);

        } else {
            imageUrl = profileImage;
        }

        const student = await this.student.findOneAndUpdate(
            { userId: studentId },
            {
                dob,
                language,
                gender,
                profileImage: imageUrl,
            },
            { new: true }
        );

        return student;
    }

    async deleteStudent(studentId: string) {
        try {
            await this.student.deleteOne({ studentId });

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

            await Promise.all(deletePromises);

            console.log('Objects deleted successfully.');
            return student;

        } catch (error) {
            console.error('An error occurred:', error);
            return error;
        }
    }

}
