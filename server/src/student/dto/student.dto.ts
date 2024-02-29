import { IsString } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    readonly studentId: string;

    @IsString()
    fullName?: string;

    @IsString()
    dob?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}

export class UpdateStudentDto {
    @IsString()
    readonly fullName?: string;

    @IsString()
    dob?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}
