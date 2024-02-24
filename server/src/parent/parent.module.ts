import { Module } from '@nestjs/common';
import { ParentController } from './controllers/parent.controller';
import { ParentService } from './services/parent.service';
import { ParentProfileController } from './controllers/parent-profile.controller';
import { ParentProfileService } from './services/parent-profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { ParentSchema } from './schemas/parent.schema';
import { ParentProfileSchema } from './schemas/parent-profile.schema';
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
            {
                name: 'ParentProfile',
                schema: ParentProfileSchema
            },
        ]),
        S3ClientModule,
    ],
    controllers: [ParentController, ParentProfileController],
    providers: [ParentService, ParentProfileService],
    exports: [ParentService, ParentProfileService]
})
export class ParentModule { }
