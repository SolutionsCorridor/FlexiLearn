import { IsString } from 'class-validator';

export class CreateParentDto {
    @IsString()
    readonly parentId: string;

    @IsString()
    readonly fullName: string;

    @IsString()
    phoneNo?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}

export class UpdateParentDto {
    @IsString()
    readonly fullName?: string;

    @IsString()
    phoneNo?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}
