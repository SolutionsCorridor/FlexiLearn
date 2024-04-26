import { Injectable } from '@nestjs/common';
import { CreateTeacherDto, TeacherMeetingDto, UpdateTeacherDto } from '../dto/teacher.dto';
import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../schemas/teacher.schema';
import { User } from 'src/user/schemas/user.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';
import { base64ToBuffer, getImageExtension } from 'src/utils/common';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Teacher.name) private teacher: Model<Teacher>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    s3Client = this.s3ClientService.getS3Client();
    BUCKET_NAME = this.s3ClientService.getBucketName();

    folderName = 'teacher/profile';

    async getTeachers() {
        try {
            const approvedUsers = await this.user.find({ status: "Approved" }).lean();
    
            const userIds = approvedUsers.map(user => user._id);
    
            const approvedTeachers = await this.teacher.find({ userId: { $in: userIds } }).lean();
    
            return approvedTeachers;
        } catch (error) {
            console.error("Error fetching approved teachers:", error);
            throw error;
        }
    }

    async saveQuizResult(data: { quizId: string; score: number; userId: string }) {
        try {
            const result = await this.teacher.updateOne(
                { userId: data.userId }, 
                { $set: { quizId: data.quizId, quizScore: data.score } }, 
                { new: true } 
            );
            return result;
        } catch (error) {
            console.error('Error updating quiz result in the database:', error);
            throw new Error('Failed to update quiz result');
        }
    }

    async getTeacher(teacherId: string) {
        const teacher = await this.teacher.findOne({ userId: teacherId }).lean();
        return teacher;
    }

    async createTeacher(data: CreateTeacherDto) {
        const { teacherId, profileImage, cv, ...restData } = data;

        const imgExtension = getImageExtension(profileImage);
        const imageBuffer = base64ToBuffer(profileImage);
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

        console.log('Image uploaded successfully.', imageUrl);
        console.log('CV uploaded successfully.', cvUrl);

        const teacher = await this.teacher.create({
            userId: teacherId,
            profileImage: imageUrl,
            cv: cvUrl,
            rating: 0,
            totalClasses: 0,
            totalStudents: 0,
            totalHours: 0,
            totalReviews: 0,
            ...restData,
        });

        return teacher;
    }

    async updateTeacher(teacherId: string, data: UpdateTeacherDto) {

        const { profileImage, cv, ...restData } = data;

        let imageUrl = null;
        let cvUrl = null;

        try {

            if (profileImage && !profileImage.startsWith('https://')) {
                const imgExtension = getImageExtension(profileImage);
                const imageBuffer = base64ToBuffer(profileImage);
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

                console.log('Image uploaded successfully.', imageUrl);

            } else {
                imageUrl = profileImage;
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

                console.log('CV uploaded successfully.', cvUrl);
            } else {
                cvUrl = cv;
            }

            const updatedTeacherProfile = await this.teacher.findOneAndUpdate(
                { userId: teacherId },
                {
                    profileImage: imageUrl,
                    cv: cvUrl,
                    ...restData,
                },
                { new: true }
            );
            return updatedTeacherProfile;
        } catch (error) {
            console.log('Error in updating teacher profile:', error);
        }
    }

    async setMeeting(teacherId: string, data: TeacherMeetingDto) {
        const updatedTeacherProfile = await this.teacher.findOneAndUpdate(
            { userId: teacherId },
            {
                meetingDate: data.meetingDate,
                meetingTime: data.meetingTime,
            },
            { new: true }
        );
        return updatedTeacherProfile;
    }

    async deleteTeacher(teacherId: string) {
        try {

            const teacher = await this.teacher.deleteOne({ userId: teacherId });

            await this.user.deleteOne({ _id: teacherId });

            const listParams = {
                Bucket: this.BUCKET_NAME,
                Prefix: `teacher/profile/${teacherId}`,
            };

            const listObjectsResponse = await this.s3Client.send(new ListObjectsV2Command(listParams));

            const deletePromises = listObjectsResponse.Contents.map(async (object) => {
                const deleteParams = {
                    Bucket: this.BUCKET_NAME,
                    Key: object.Key,
                };
                await this.s3Client.send(new DeleteObjectCommand(deleteParams));
            });

            await Promise.all(deletePromises);

            console.log('Objects deleted successfully.');
            return teacher;

        } catch (error) {
            console.error('An error occurred:', error);
            return error;
        }
    }

    async updateComments(teacherId: string, adminComments: string) {
        const updatedTeacherProfile = await this.teacher.findOneAndUpdate(
            { userId: teacherId },
            { adminComments },
            { new: true }
        );
        return updatedTeacherProfile;
    }

}
