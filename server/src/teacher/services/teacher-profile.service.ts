import { Injectable } from '@nestjs/common';
import { CreateTeacherProfileDto, UpdateTeacherProfileDto } from '../dto/teacher-profile.dto';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { base64ToBuffer, getImageExtension } from 'src/utils/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeacherProfile } from '../schemas/teacher-profile.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Teacher } from '../schemas/teacher.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';

@Injectable()
export class TeacherProfileService {
    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Teacher.name) private teacher: Model<Teacher>,
        @InjectModel(TeacherProfile.name) private teacherProfile: Model<TeacherProfile>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    folderName = 'teacher/profile';

    s3Client = this.s3ClientService.getS3Client();

    BUCKET_NAME = this.s3ClientService.getBucketName();

    async getTeacherProfile(teacherId: string) {
        const teacherProfile = await this.teacherProfile.findOne({ teacherId }).lean();
        return teacherProfile;
    }

    async createTeacherProfile(data: CreateTeacherProfileDto) {
        // console.log('Data', data)

        const { teacherId, fullName, ...restData } = data;

        // const teacher = await this.teacher.create({
        //     teacherId,
        //     fullName,
        // });

        // console.log('Teacher', teacher);

        const image = data.profileImage;
        const cv = data.cv;

        const imgExtension = getImageExtension(image);
        const imageBuffer = base64ToBuffer(image);
        const imageKey = `${this.folderName}/${teacherId}.${imgExtension}`;

        const cvExtension = getImageExtension(cv);
        const cvBuffer = base64ToBuffer(cv);
        const cvKey = `${this.folderName}/${teacherId}.${cvExtension}`;

        const params: PutObjectCommandInput = {
            Bucket: this.BUCKET_NAME,
            Key: `${imageKey}`,
            Body: imageBuffer,
            ACL: 'public-read',
            ContentType: `image/${imgExtension}`,
        };

        const cvParams: PutObjectCommandInput = {
            Bucket: this.BUCKET_NAME,
            Key: `${cvKey}`,
            Body: cvBuffer,
            ACL: 'public-read',
            ContentType: `image/${cvExtension}`,
        };

        const uploadParams = new PutObjectCommand(params);
        const cvUploadParams = new PutObjectCommand(cvParams);

        await this.s3Client.send(uploadParams);
        await this.s3Client.send(cvUploadParams);

        const imageUrl = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;
        const cvUrl = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${cvKey}`;

        await this.user.updateOne({ userId: teacherId }, { fullName });

        const teacherProfile = await this.teacherProfile.create({
            teacherId,
            profileImage: imageUrl,
            cv: cvUrl,
            rating: 0,
            totalClasses: 0,
            totalStudents: 0,
            totalHours: 0,
            totalReviews: 0,
            ...restData,
        });

        return teacherProfile;
    }

    async updateTeacherProfile(teacherId: string, data: UpdateTeacherProfileDto) {
        const { fullName, ...updatedData } = data;
        const image = data.profileImage;
        const cv = data.cv;

        let imageUrl = null;
        let cvUrl = null;

        try {

            if (image && !image.startsWith('https://')) {
                const imgExtension = getImageExtension(image);
                const imageBuffer = base64ToBuffer(image);
                const imageKey = `${this.folderName}/${teacherId}.${imgExtension}`;

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

            } else {
                imageUrl = image;
            }

            if (cv && !cv.startsWith('https://')) {

                const cvExtension = getImageExtension(cv);
                const cvBuffer = base64ToBuffer(cv);
                const cvKey = `${this.folderName}/${teacherId}.${cvExtension}`;

                const cvParams: PutObjectCommandInput = {
                    Bucket: this.BUCKET_NAME,
                    Key: `${cvKey}`,
                    Body: cvBuffer,
                    ACL: 'public-read',
                    ContentType: `image/${cvExtension}`,
                };

                const cvUploadParams = new PutObjectCommand(cvParams);
                await this.s3Client.send(cvUploadParams);
                cvUrl = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${cvKey}`;

            } else {
                cvUrl = cv;
            }

            await this.user.updateOne({ userId: teacherId }, { fullName });

            const updatedTeacherProfile = await this.teacherProfile.findOneAndUpdate(
                { teacherId },
                {
                    profileImage: imageUrl,
                    cv: cvUrl,
                    ...updatedData,
                },
                { new: true }
            );
            return updatedTeacherProfile;
        } catch (error) {
            console.log('Error in updating teacher profile:', error);
        }

    }
}
