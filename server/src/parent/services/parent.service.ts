import { Injectable } from '@nestjs/common';
import { CreateParentDto, UpdateParentDto } from '../dto/parent.dto';
import { DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent } from '../schemas/parent.schema';
import { User } from 'src/user/schemas/user.schema';
import { ParentProfile } from '../schemas/parent-profile.schema';
import { S3ClientService } from 'src/s3-client/s3-client.service';

@Injectable()
export class ParentService {

    constructor(
        @InjectModel(User.name) private user: Model<User>,
        @InjectModel(Parent.name) private parent: Model<Parent>,
        @InjectModel(ParentProfile.name) private parentProfile: Model<ParentProfile>,
        private readonly s3ClientService: S3ClientService,
    ) { }

    s3Client = this.s3ClientService.getS3Client();
    BUCKET_NAME = this.s3ClientService.getBucketName();

    async getParents() {
        const parents = await this.parent.find().lean();
        return parents;
    }

    async getParent(parentId: string) {
        const parent = await this.parent.findOne({ parentId }).lean();
        return parent;
    }

    async createParent(data: CreateParentDto) {
        const { parentId } = data;
        const parent = await this.parent.create({ parentId });
        return parent;
    }

    // async updateParent(parentId: string, data: UpdateParentDto) {
    //     const { qualification } = data;
    //     const parent = await this.prisma.getPrismaClient().parent.update({
    //         where: { id: parentId },
    //         data: {
    //             qualification
    //         },
    //     });
    //     return parent;
    // }

    async deleteParent(parentId: string) {
        try {
            await this.parentProfile.deleteOne({ parentId });

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
