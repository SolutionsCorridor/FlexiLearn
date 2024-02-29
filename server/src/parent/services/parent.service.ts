import { Injectable } from '@nestjs/common';
import { CreateParentDto, UpdateParentDto } from '../dto/parent.dto';
import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent } from '../schemas/parent.schema';
import { User } from 'src/user/schemas/user.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';
import { base64ToBuffer, getImageExtension } from 'src/utils/common';

@Injectable()
export class ParentService {

    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Parent.name) private parent: Model<Parent>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    s3Client = this.s3ClientService.getS3Client();
    BUCKET_NAME = this.s3ClientService.getBucketName();

    folderName = 'parent/profile';

    async getParents() {
        const parents = await this.parent.find().lean();
        return parents;
    }

    async getParent(parentId: string) {
        const parent = await this.parent.findOne({ userId: parentId }).lean();
        return parent;
    }

    async createParent(data: CreateParentDto) {
        const { parentId, profileImage, ...restData } = data;

        const imgExtension = getImageExtension(profileImage);
        const imageBuffer = base64ToBuffer(profileImage);

        const imageKey = `${this.folderName}/${parentId}.${imgExtension}`;

        const params: PutObjectCommandInput = {
            Bucket: this.BUCKET_NAME,
            Key: imageKey,
            Body: imageBuffer,
            ACL: 'public-read',
            ContentType: `image/${imgExtension}`,
        };

        await this.s3Client.send(new PutObjectCommand(params));

        const imageUrl = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;


        const parent = await this.parent.create(
            {
                userId: parentId,
                ...restData,
                profileImage: imageUrl,
            }
        );
        return parent;
    }

    async updateParent(parentId: string, data: UpdateParentDto) {
        const { profileImage, ...restData } = data;

        let imageUrl = '';

        if (profileImage && !profileImage.startsWith('https://')) {
            const imgExtension = getImageExtension(profileImage);
            const imageBuffer = base64ToBuffer(profileImage);
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

            console.log('Image uploaded successfully.', imageUrl);

        } else {
            imageUrl = profileImage;
        }
        const parent = await this.parent.findOneAndUpdate(
            { userId: parentId },
            {
                ...restData,
                profileImage: imageUrl
            },
            { new: true }
        );

        return parent;
    }

    async deleteParent(parentId: string) {
        try {
            await this.parent.deleteOne({ parentId });

            const parent = await this.parent.deleteOne({ parentId });

            await this.user.deleteOne({ userId: parentId });

            const listParams = {
                Bucket: this.BUCKET_NAME,
                Prefix: `parent/profile/${parentId}`,
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
            return parent;

        } catch (error) {
            console.error('An error occurred:', error);
            return error;
        }
    }

}
