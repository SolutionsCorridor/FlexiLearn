import { IsString, IsDate } from 'class-validator';

export class CreateStudentProfileDto {
    @IsString()
    studentId: string;

    @IsString()
    fullName?: string;

    @IsDate()
    dob?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}

export class UpdateStudentProfileDto {
    @IsString()
    fullName?: string;

    @IsDate()
    dob?: string;

    @IsString()
    language?: string;

    @IsString()
    gender?: string;

    @IsString()
    profileImage?: string;
}
