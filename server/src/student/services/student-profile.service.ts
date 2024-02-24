import { Injectable } from '@nestjs/common';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { base64ToBuffer, getImageExtension } from 'src/utils/common';
import { CreateStudentProfileDto, UpdateStudentProfileDto } from '../dto/student-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { StudentProfile } from '../schemas/student-profile.schema';
import { Model } from 'mongoose';
import { S3ClientService } from 'src/s3-client/s3-client.service';

@Injectable()
export class StudentProfileService {

    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(StudentProfile.name) private studentProfile: Model<StudentProfile>,
        private readonly s3ClientService: S3ClientService,
    ) { }


    folderName = 'student/profile';
    s3Client = this.s3ClientService.getS3Client();
    BUCKET_NAME = this.s3ClientService.getBucketName();

    async getStudentProfile(studentId: string) {
        const studentProfile = await this.studentProfile.findOne({ studentId }).lean();
        return studentProfile;
    }

    async createStudentProfile(data: CreateStudentProfileDto) {
        // const { studentId, fullName, dob, language, gender, image } = data;
        const { studentId, fullName, ...restData } = data;
        const image = data.profileImage;

        // const createdData = { dob, language, gender }

        const imgExtension = getImageExtension(image);
        const imageBuffer = base64ToBuffer(image);
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
        const imageUrl = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;

        await this.user.updateOne({ userId: studentId }, { fullName });

        data.profileImage = imageUrl;

        const studentProfile = await this.studentProfile.create({
            studentId,
            ...restData,
            profileImage: imageUrl,
        });

        return studentProfile;
    }

    async updateStudentProfile(studentId: string, data: UpdateStudentProfileDto) {
        // Implement your update logic here
        const { fullName, ...updatedData } = data;
        const image = data.profileImage;

        let imageUrl = null;

        try {

            if (image && !image.startsWith('https://')) {
                const imgExtension = getImageExtension(image);
                const imageBuffer = base64ToBuffer(image);
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

            } else {
                imageUrl = image;
            }

            await this.user.updateOne({ userId: studentId }, { fullName });


            const updatedStudentProfile = await this.studentProfile.findOneAndUpdate(
                { studentId },
                {
                    ...updatedData,
                    profileImage: imageUrl,
                },
                { new: true }
            );

            return updatedStudentProfile;
        } catch (error) {
            console.log('Error in updating student profile:', error);
        }

    }
}
