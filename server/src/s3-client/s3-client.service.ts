// s3-client.service.ts

import { Injectable } from '@nestjs/common';
import { S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class S3ClientService {
    private readonly s3Client: S3Client;

    constructor() {
        const S3_REGION = process.env.S3_REGION;
        const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
        const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

        this.s3Client = new S3Client({
            region: S3_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    getS3Client(): S3Client {
        return this.s3Client;
    }

    getBucketName(): string {
        return process.env.S3_BUCKET_NAME;
    }
}
