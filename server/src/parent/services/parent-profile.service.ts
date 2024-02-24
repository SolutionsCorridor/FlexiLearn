import { Injectable } from '@nestjs/common';
import { base64ToBuffer, getImageExtension } from 'src/utils/common';
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { CreateParentProfileDto, UpdateParentProfileDto } from '../dto/parent-profile.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { ParentProfile } from '../schemas/parent-profile.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';

@Injectable()
export class ParentProfileService {
    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(ParentProfile.name) private parentProfile: Model<ParentProfile>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    folderName = 'parent/profile';

    s3Client = this.s3ClientService.getS3Client();

    BUCKET_NAME = this.s3ClientService.getBucketName();

    async getParentProfile(parentId: string) {
        const parentProfile = await this.parentProfile.findOne({ parentId }).lean();
        return parentProfile;
    }

    async createParentProfile(data: CreateParentProfileDto) {
        const { parentId, fullName, ...restData } = data;
        const image = data.profileImage;

        const imgExtension = getImageExtension(image);
        const imageBuffer = base64ToBuffer(image);
        const imageKey = `${this.folderName}/${parentId}.${imgExtension}`;

        console.log(this.BUCKET_NAME)

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

        await this.user.updateOne({ userId: parentId }, { fullName });

        const parentProfile = await this.parentProfile.create({
            parentId,
            profileImage: imageUrl,
            ...restData,
        });

        return parentProfile;
    }

    async updateParentProfile(parentId: string, data: UpdateParentProfileDto) {
        const { fullName, ...updatedData } = data;
        const image = data.profileImage;

        let imageUrl = null;

        try {

            if (image && !image.startsWith('https://')) {
                const imgExtension = getImageExtension(image);
                const imageBuffer = base64ToBuffer(image);
                const imageKey = `${this.folderName}/${parentId}.${imgExtension}`;

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

            await this.user.updateOne({ userId: parentId }, { fullName });

            const updatedParentProfile = await this.parentProfile.findOneAndUpdate(
                { parentId },
                {
                    profileImage: imageUrl,
                    ...updatedData,
                },
                { new: true }
            );

            return updatedParentProfile;
        } catch (error) {
            console.log('Error in updating parent profile:', error);
        }

    }
}
