import { Module } from '@nestjs/common';
import { ParentController } from './controllers/parent.controller';
import { ParentService } from './services/parent.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { ParentSchema } from './schemas/parent.schema';
import { S3ClientModule } from 'src/s3-client/s3-client.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            },
            {
                name: 'Parent',
                schema: ParentSchema
            },
        ]),
        S3ClientModule,
    ],
    controllers: [ParentController],
    providers: [ParentService],
    exports: [ParentService]
})
export class ParentModule { }
