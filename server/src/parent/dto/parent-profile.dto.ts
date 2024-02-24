import { IsString, IsOptional, IsUUID, IsInt } from 'class-validator';

export class CreateParentProfileDto {
    @IsString()
    parentId: string;

    @IsString()
    fullName?: string;

    @IsString()
    phoneNo?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}

export class UpdateParentProfileDto {
    @IsString()
    parentId: string;

    @IsString()
    fullName?: string;

    @IsString()
    phoneNo?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}
